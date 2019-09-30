import { Application } from 'egg';
import * as jwtTool from 'jsonwebtoken';

const JWT = Symbol('Application#jwt');

export default {
  /**
   * 获取其他微服务地址
   */

  get serviceApis(this: Application) {
    const { javaK12Server } = this.config.eureka.apps;
    return {
      javaK12Server: async () => await this.eureka.getServiceByAppId(javaK12Server.name),
    };
  },

  /**
   * jwt相关操作
   */
  get jwt(this: Application) {
    if (this[JWT]) {
      return this[JWT];
    }
    const { jwt } = this.config.authorize;
    this[JWT] = {
      sign: (payload: object, options: object = {}) => {
        options = Object.assign(jwt.sign, options);
        return jwtTool.sign(payload, jwt.secret, options);
      },

      verify: (token: string, options: object = {}) => {
        options = Object.assign(jwt.verify, options);
        return jwtTool.verify(token, jwt.secret, options);
      },

      decode: (token: string, options: object = {}) => {
        options = Object.assign(jwt.decode, options);
        return jwtTool.decode(token, options);
      },
    };
    return this[JWT];
  },
};
