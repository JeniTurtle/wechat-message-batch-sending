import * as lodash from 'lodash';
import { Inject, Service } from 'typedi';
import { BaseConsumer } from 'egg-rabbitmq-plus';
import PublishService from '@service/rabbitmq/publish';
import TemplateMsgService from '@service/wechat/templateMessage';
import { WxTmPushStatus } from '@entity/wechat/templateMessage';
import MessageTaskService from '@service/wechat/messageTask';
import { WxMsgTaskProgress } from '@entity/wechat/messageTask';

@Service('TemplateMessageConsumer')
export default class TemplateMessageConsumer extends BaseConsumer {
  @Inject('RBMQPublishService')
  private publishService: PublishService;

  @Inject('WxTemplateMessageService')
  private templateMsgService: TemplateMsgService;

  @Inject('WxMessageTaskService')
  private messageTaskService: MessageTaskService;

  static get config() {
    return {
      // env: ['local'],  // 可选，默认为所有环境
      disable: false, // 是否不启用
      queue: 'message_queue',
      routingKey: 'wechat/message/template', // 不配置则监听队列所有消息
    };
  }

  /**
   * 推送成功后，触发回调
   * @param callbackUrl
   * @param data
   */
  private async messageCallback(callbackUrl: string, data: any) {
    try {
      // 请求配置的回调地址
      const { status, data: resp } = await this.ctx.curl(callbackUrl, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        method: 'POST',
        dataType: 'json',
        data,
      });
      this.ctx.logger.info('callback response: ', resp);
      // 如果回调接口异常，丢到MQ中，调用服务自行消费。
      if (status < 200 || status > 204 || Number(resp.code) !== 600) {
        throw new Error('模板消息推送回调接口异常');
      }
    } catch (err) {
      this.ctx.logger.error(err);
      const isSend = this.publishService.sendToMessageCallbackQueue(data);
      this.ctx.logger.info('消息回调队列写入状态：', isSend);
      return false;
    }
    return true;
  }

  /**
   * 消息订阅，自动消费
   */
  async subscribe(data) {
    let content: any;
    const { app } = this.ctx;
    const { channel } = this.publishService.getMessageQueueInfo();
    try {
      content = JSON.parse(data.content.toString());
    } catch (err) {
      throw err;
    }
    const {
      taskId,
      msgId,
      openid,
      templateId,
      url,
      color,
      data: msgData,
      miniprogram,
      wechatAccount: { id, appId, appSecret, messageTokenUrl },
    } = content;
    const redisTaskCountKey = `${taskId}_count`;
    const redisTaskSucceedKey = `${taskId}_succeed`;
    const redisTaskFailedKey = `${taskId}_failed`;
    const saveData: any = {
      messageTaskId: taskId,
      executorId: id,
      openid,
      templateId,
      url,
      color,
      data: JSON.stringify(msgData),
      miniprogramAppId: miniprogram.appid,
      miniprogramPagepath: miniprogram.pagepath,
      status: WxTmPushStatus.DEFAULT,
    };
    try {
      // 推送微信模板消息
      const wechatApi = this.ctx.getWechatApi(appId, appSecret);
      await wechatApi.sendTemplate(openid, templateId, url, color, msgData, miniprogram);
      // 成功后，缓存成功结果到redis
      await app.redis.sadd(redisTaskSucceedKey, msgId);
      // 确认消费
      channel.ack(data);
      // 设置状态为成功
      saveData.status = WxTmPushStatus.SUCCESS;
    } catch (err) {
      this.ctx.logger.error(err);
      // 失败后，缓存错误结果到redis
      await app.redis.sadd(
        redisTaskFailedKey,
        JSON.stringify({
          msgId,
          errmsg: err.message,
        }),
      );
      // 最后把推送失败的消息丢到死信交换机里，供后续操作处理
      channel.nack(data, false, false);
      // 设置状态为失败
      saveData.status = WxTmPushStatus.FAILED;
      // 添加失败原因
      saveData.failReason = err.message;
    } finally {
      // 不管成功失败，把redis任务数量减1
      const count = await app.redis.decr(redisTaskCountKey);
      try {
        // 把推送记录写入到数据库中
        await this.templateMsgService.create(saveData);
      } catch (err) {
        this.ctx.logger.error(err);
      }
      if (count <= 0) {
        // 读取redis缓存的处理结果
        let [succeedSet, failedSet] = await Promise.all([
          app.redis.smembers(redisTaskSucceedKey),
          app.redis.smembers(redisTaskFailedKey),
        ]);
        succeedSet = lodash.isString(succeedSet) ? [succeedSet] : succeedSet; // 如果set只有一条数据，会返回string
        failedSet = JSON.parse(`[${failedSet.toString()}]`);
        const response = {
          taskId,
          succeed: succeedSet,
          failed: failedSet,
        };
        // 把处理结果发送给回调接口
        await this.messageCallback(messageTokenUrl, response);
        // 删除redis缓存数据
        await Promise.all([
          app.redis.del(redisTaskCountKey),
          app.redis.del(redisTaskSucceedKey),
          app.redis.del(redisTaskFailedKey),
        ]);
        // 执行完成后，更新任务进度
        await this.messageTaskService.update(
          {
            progress: WxMsgTaskProgress.COMPLETE,
          },
          {
            id: taskId,
          },
        );
      }
    }
  }
}
