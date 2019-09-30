import * as assert from 'assert';
import * as uuidV1 from 'uuid/v1';
import { Context } from 'egg';
import { Inject } from 'typedi';
import { Post, TagsAll, Summary, BeforeAll, Joi, IgnoreJwtAll, Get, Delete, ResponseMessage } from 'egg-shell-plus';
import msgTokenValidate, { ParametersWithToken } from '@middleware/routerMiddleware/msgTokenValidate';
import PublishService from '@service/rabbitmq/publish';
import MessageTaskService from '@service/wechat/messageTask';
import { WxMsgTaskType, WxMsgTaskProgress, WxMsgIsDelay } from '@entity/wechat/messageTask';

@IgnoreJwtAll
@TagsAll('微信模板管理接口')
@BeforeAll(msgTokenValidate)
export default class Template {
  @Inject('RBMQPublishService')
  private publishService: PublishService;

  @Inject('WxMessageTaskService')
  private messageTaskService: MessageTaskService;

  @Post()
  @Summary('添加模板')
  @ParametersWithToken({
    body: Joi.object().keys({
      templateIdShort: Joi.string()
        .required()
        .description('新增的模板ID'),
    }),
  })
  async add(ctx: Context) {
    const { wechatApi, body } = ctx;
    return await wechatApi.addTemplate(body.templateIdShort);
  }

  @Get()
  @Summary('获取所有模板列表')
  @ParametersWithToken()
  async list(ctx: Context) {
    const { wechatApi } = ctx;
    return await wechatApi.getAllPrivateTemplate();
  }

  @Delete()
  @Summary('删除模板')
  @ParametersWithToken({
    body: Joi.object().keys({
      templateId: Joi.string()
        .required()
        .description('删除的模板ID'),
    }),
  })
  async delete(ctx: Context) {
    const { wechatApi, body } = ctx;
    return await wechatApi.delPrivateTemplate(body.templateId);
  }

  @Post()
  @Summary('发送不同内容的公众号模板消息给多个用户')
  @ParametersWithToken({
    body: Joi.object()
      .keys({
        delayTime: Joi.date()
          .timestamp()
          .description('指定时间发送，时间格式为时间戳，不指定为立即发送'),
        tousers: Joi.array()
          .items(Joi.string())
          .min(1)
          .description('接收者openid列表'),
        templateId: Joi.string()
          .required()
          .description('模板ID'),
        url: Joi.string().description('网页跳转地址，跟urls只能选一个'),
        urls: Joi.array()
          .items(Joi.string())
          .description('多个网页跳转地址，数量和顺序与tousers一致，跟url只能选一个'),
        color: Joi.string().description('模板内容字体颜色，不填默认为黑色'),
        data: Joi.object().description('模板数据'),
        dataList: Joi.array()
          .items(Joi.object())
          .description('多个模板数据，数量和顺序与tousers一致，跟data只能选一个'),
        miniprogram: Joi.object()
          .keys({
            appid: Joi.string().description('小程序app_id'),
            pagepath: Joi.string().description('小程序跳转地址，跟pagepaths只能选一个'),
            pagepaths: Joi.array()
              .items(Joi.string())
              .description('多个小程序跳转地址，数量和顺序与tousers一致，跟pagepath只能选一个'),
          })
          .description('跳小程序所需数据，不需跳小程序可不用传该数据'),
      })
      .without('data', 'dataList')
      .without('url', 'urls')
      .without('pagepath', 'pagepaths'),
  })
  @ResponseMessage('消息已写入队列，等待回调')
  async send(ctx: Context) {
    const resp: any = {
      succeed: [],
      failed: [],
    };
    const { TEMPLATE_MESSAGE_WRITE_MQ_ERROR } = ctx.app.exception.wechat;
    const { delayTime, tousers, templateId, url, urls, dataList, color, data, miniprogram } = ctx.body;
    const { pagepath, pagepaths, appid } = miniprogram;
    const openids = Array.from(new Set(tousers));
    const expiration = delayTime - new Date().getTime();
    const isDelay = expiration > 1000;
    const saveData = {
      batchCount: openids.length,
      params: JSON.stringify(ctx.body),
      executorId: ctx.wechatAccount.id,
      type: WxMsgTaskType.TEMPLATE,
      progress: WxMsgTaskProgress.READY,
      isDelay: isDelay ? WxMsgIsDelay.YES : WxMsgIsDelay.NO,
      planTime: isDelay ? delayTime : null,
    };
    assert(data || dataList, 'data和dataList必须传入一个');
    miniprogram && assert(pagepath || pagepaths, 'pagepath和pagepaths必须传入一个');
    urls && assert(tousers.length === urls.length, 'urls数量与tousers数量不一致');
    dataList && assert(tousers.length === dataList.length, 'dataList数量与tousers数量不一致');
    miniprogram && pagepaths && assert(tousers.length === pagepaths.length, 'pagepaths数量与tousers数量不一致');
    try {
      // 往数据库写入任务信息
      const { id: taskId } = await this.messageTaskService.create(saveData);
      // 往redis写入任务数量
      const redisTaskCountKey = `${taskId}_count`;
      await ctx.app.redis.set(redisTaskCountKey, openids.length);
      // 消息批量写入队列
      openids.forEach((openid, index) => {
        let published = false;
        const msgId = uuidV1();
        const orderId = index + 1;
        const expiration = delayTime - new Date().getTime();
        const msgData = {
          taskId,
          msgId,
          orderId,
          openid,
          templateId,
          url: url || (urls && urls[index]),
          color,
          data: data || dataList[index],
          miniprogram: miniprogram && {
            appid,
            pagepath: pagepath || pagepaths[index],
          },
          wechatAccount: ctx.wechatAccount,
        };
        published = isDelay
          ? this.publishService.sendToDelayMessageQueue(msgData, expiration)
          : this.publishService.sendToMessageQueue(msgData);
        const temp = published ? resp.succeed : resp.failed;
        temp.push({ openid, msgId });
      });
      resp.taskId = taskId;
      return resp;
    } catch (err) {
      ctx.logger.error(err);
      ctx.error(TEMPLATE_MESSAGE_WRITE_MQ_ERROR);
    }
  }
}
