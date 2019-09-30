import * as md5 from 'js-md5';
import { Post, TagsAll, Summary, Parameters, Joi, Get, Put, Delete } from 'egg-shell-plus';
import { Inject } from 'typedi';
import AccountService from '@service/wechat/account';

@TagsAll('微信账户管理接口')
export default class Account {
  @Inject('WxAccountService')
  readonly accountService: AccountService;

  @Post()
  @Summary('新增微信账户')
  @Parameters({
    body: Joi.object().keys({
      accountName: Joi.string()
        .required()
        .description('账户名称'),
      appId: Joi.string()
        .required()
        .description('微信公众号AppId'),
      appSecret: Joi.string()
        .required()
        .description('微信公众号AppSecret'),
      organizationId: Joi.string().description('组织机构ID'),
    }),
  })
  async add(ctx) {
    const { id, appSecret } = ctx.userData.userinfo;
    const { appId } = ctx.body;
    ctx.body.identityId = md5(ctx.helper.bcrypt.hash(appId + appSecret));
    return await this.accountService.create(ctx.body, id);
  }

  @Get()
  @Summary('获取微信账户列表')
  @Parameters({
    query: Joi.object().keys({
      pageIndex: Joi.number()
        .integer()
        .min(1)
        .required()
        .description('当前页码'),
      pageSize: Joi.number()
        .integer()
        .min(1)
        .required()
        .description('每页记录数'),
    }),
  })
  async list(ctx) {
    const { pageIndex, pageSize } = ctx.request.query;
    return await this.accountService.findAndCount({
      offset: (pageIndex - 1) * pageSize,
      limit: pageSize,
      orderBy: 'createdAt_DESC',
    });
  }

  @Put('/update/:accountId')
  @Summary('修改微信账户')
  @Parameters({
    pathParams: Joi.object().keys({
      accountId: Joi.string()
        .required()
        .description('账户id'),
    }),
    body: Joi.object().keys({
      accountName: Joi.string().description('账户名称'),
      appId: Joi.string().description('微信公众号AppId'),
      appSecret: Joi.string().description('微信公众号AppSecret'),
      organizationId: Joi.string().description('组织机构ID'),
    }),
  })
  async update(ctx) {
    const { id } = ctx.userData.userinfo;
    return await this.accountService.update(
      ctx.body,
      {
        id: ctx.params.accountId,
      },
      id,
    );
  }

  /**
   * 删除权限
   * @param ctx
   */
  @Delete('/delete/:accountId')
  @Summary('删除微信账户')
  @Parameters({
    pathParams: Joi.object().keys({
      accountId: Joi.string()
        .required()
        .description('菜单账户idid'),
    }),
  })
  public async delete(ctx) {
    const {
      params: { accountId },
      userData: { userinfo },
    } = ctx;
    return await this.accountService.delete(
      {
        id: accountId,
      },
      userinfo.id,
    );
  }
}
