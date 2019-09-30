import { Application } from 'egg';

export default (_app: Application) => {
  return {
    INVAILD_IDENTITY_ID_ERROR: {
      code: 701,
      msg: '无效的身份ID',
    },
    GET_ACCESS_TOKEN_PARAMS_ERROR: {
      code: 702,
      msg: 'accessToken获取参数不合法',
    },
    CREATE_ACCOUNT_ERROR: {
      code: 703,
      msg: '新增微信账户失败',
    },
    TEMPLATE_MESSAGE_WRITE_MQ_ERROR: {
      code: 704,
      msg: '模板消息写入消息队列失败',
    },
    TEMPLATE_MESSAGE_PUSH_FAILED_ERROR: {
      code: 705,
      msg: '模板消息推送失败',
    },
  };
};
