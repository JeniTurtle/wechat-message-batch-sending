import * as assert from 'assert';
import { Context } from 'egg';
import createWechatApi from '@lib/wechatApi';

const wechatApiMap = new Map<string, any>();

export interface IResponseJsonFormat {
  code?: number;
  data: any;
  msg?: string;
}

export interface IResponseErrorFormat {
  code?: number;
  error?: string;
  msg?: string;
}

export default {
  /**
   * 输出json格式数据
   * @param resp
   */
  success(this: Context, resp: IResponseJsonFormat) {
    const { code = 100, data, msg = '请求成功' } = resp;
    this.status = 200;
    return (this.response.body = {
      code,
      msg,
      data,
    });
  },

  /**
   * 输出错误格式数据
   * @param resp
   * @param status
   */
  error(this: Context, resp: IResponseErrorFormat, status: number = 200) {
    const { DEFAULT_ERROR } = this.app.exception.usually;
    const { code = DEFAULT_ERROR.code, msg = DEFAULT_ERROR.msg, error } = resp;
    this.status = status;
    return (this.response.body = {
      code,
      msg,
      error,
    });
  },

  /**
   * 获取wechatApi实例
   */
  get wechatApi(this: Context) {
    assert(this.wechatAccount, '获取wechatApi实例，必须先走wechatTokenValidate中间件');
    const { appId, appSecret } = this.wechatAccount;
    if (wechatApiMap.has(appId)) {
      return wechatApiMap.get(appId);
    }
    const wechatApi = createWechatApi(this.app, appId, appSecret);
    wechatApiMap.set(appId, wechatApi);
    return wechatApi;
  },

  /**
   * 获取wechatApi实例
   */
  getWechatApi(this: Context, appId: string, appSecret: string) {
    this.wechatAccount = {
      appId,
      appSecret,
    };
    return this.wechatApi;
  },
};
