import { Application } from 'egg';
import * as WechatApi from 'co-wechat-api';

interface IAccessToken {
  accessToken: string;
  expireTime: number;
}

const prodk12NodeServer = 'http://wxk12.weds.com.cn/api/v2/wechat/token';

export default (app: Application, appId: string, appSecret: string) => {
  const WECHAT_ACCESS_TOKEN = `${appId}_wechat_access_token`;

  if (!appId || !appSecret) {
    app.logger.error("[egg-wechat-api] must set `appId` and `appSecret` in plugin's config.");
    return null;
  }

  if (!app.redis) {
    app.logger.error('[egg-wechat-api] redis is ready ?');
    return null;
  }

  const adapter = app.redis;

  async function getTicketToken(type) {
    const raw = await adapter.get(`${appId}_wechat_${type}`);
    return JSON.parse(raw || '{}');
  }

  async function saveTicketToken(type, _ticketToken) {
    await adapter.set(`${appId}_wechat_${type}`, JSON.stringify(_ticketToken));
  }

  async function getAccessToken(): Promise<IAccessToken> {
    const content = await adapter.get(WECHAT_ACCESS_TOKEN);
    return JSON.parse(content || '{}');
  }

  async function saveAccessToken(token) {
    // 传入null的话，不作处理
    if (!token) {
      return;
    }
    // 更新当前redis数据库
    await adapter.set(WECHAT_ACCESS_TOKEN, JSON.stringify(token));
    // 更新生产环境access_token
    await app.curl(prodk12NodeServer, {
      method: 'POST',
      dataType: 'json',
      data: {
        appId,
        token: token.accessToken,
        expired_at: token.expireTime,
      },
    });
  }

  const api = new WechatApi(appId, appSecret, getAccessToken, saveAccessToken);
  api.registerTicketHandle(getTicketToken, saveTicketToken);
  return api;
};
