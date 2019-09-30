import { Post, TagsAll, Summary, Parameters, Joi, IgnoreJwtAll, Get } from 'egg-shell-plus';
import { Inject } from 'typedi';
import AccountService from '@service/wechat/account';

@IgnoreJwtAll
@TagsAll('调用微信相关接口的token验证')
export default class Template {
  @Inject('WxAccountService')
  readonly accountService: AccountService;

  @Get('/generate_temporary_token')
  @Summary('按照固定规范生成一个临时token，用来获取access token')
  async generateTemporaryToken(ctx) {
    // 获取当前的时间戳
    const timestamp = String(new Date().getTime());
    // 时间戳倒序
    const reverseTimestamp = timestamp
      .split('')
      .reverse()
      .join('');
    return ctx.helper.crypto.encrypt(reverseTimestamp);
  }

  @Get('/get_access_token')
  @Summary('获取accessToken，有效期20分钟')
  @Parameters({
    query: Joi.object().keys({
      identityId: Joi.string()
        .required()
        .description('唯一身份标识'),
      token: Joi.string()
        .required()
        .description('按照固定规范生成的临时token，(取当前时间戳倒序后AES加密，加密方式与登陆密码一致)'),
    }),
  })
  async getAccessToken(ctx) {
    const { crypto } = ctx.helper;
    const { token, identityId } = ctx.query;
    const { INVAILD_IDENTITY_ID_ERROR, GET_ACCESS_TOKEN_PARAMS_ERROR } = ctx.app.exception.wechat;
    // 获取当前分钟的时间戳
    const timestamp = String(new Date().getTime());
    // 解码传入临时token，并倒序
    const decodeTime = crypto
      .decrypt(token)
      .split('')
      .reverse()
      .join('');
    // 判断传入的token是否合法
    if (Number(timestamp) - Number(decodeTime) > 60 * 1000) {
      ctx.error(GET_ACCESS_TOKEN_PARAMS_ERROR);
      return;
    }
    const account = await this.accountService.findOne({
      identityId_eq: identityId,
    });
    // 检查传入的身份ID是否有效
    if (!account) {
      ctx.error(INVAILD_IDENTITY_ID_ERROR);
      return;
    }
    const { id, appId, appSecret, messageTokenUrl } = account;
    // 生成access token
    const accessToken = ctx.app.jwt.sign(
      {
        id,
        identityId,
        appId,
        appSecret,
        messageTokenUrl,
      },
      {
        expiresIn: 1200, // 有效期20分钟
      },
    );
    return crypto.encrypt(accessToken);
  }
}
