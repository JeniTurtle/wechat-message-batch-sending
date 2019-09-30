import { EggAppConfig, PowerPartial } from 'egg';
import { address } from 'ip';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  const ip = address('public', 'ipv4');
  const port = 7021; // 这里端口要与package.json中start命令指定的port参数一致。

  config.port = port;

  config.logger = {
    dir: 'logs',
  };

  config.development = {
    watchDirs: ['app.ts', 'agent.ts', 'lib', 'plugin'], // 开发环境监听修改文件重启服务
    ignoreDirs: ['app/typeorm/graphql'], // 开发环境忽略监听修改文件重启服务
  };

  config.eureka = {
    apps: {
      configServer: {
        name: 'CONFIG-SERVER',
        configFile: 'abc-dev.yml',
      },
    },
    client: {
      instance: {
        instanceId: `${ip}:${port}`,
        app: 'MESSAGE-PLATFORM',
        hostName: ip,
        ipAddr: ip,
        statusPageUrl: `http://${ip}:${port}/api/eureka/info`, // spring admin 注册心跳
        healthCheckUrl: `http://${ip}:${port}/api/eureka/health`, // eureka 注册心跳
        port: {
          $: port,
          '@enabled': 'true',
        },
        vipAddress: 'MESSAGE-PLATFORM',
        dataCenterInfo: {
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
          name: 'MyOwn',
        },
      },
      eureka: {
        registryFetchInterval: 3000,
        // 有多个 eureka 集群
        serviceUrls: {
          default: ['http://10.0.0.1:8899/eureka/apps/'],
        },
      },
    },
  };

  // @ts-ignore
  config.redis = {
    client: {
      port: '${redis.port}', // 从springCloud配置中取
      host: '${redis.host}',
      password: '${redis.password}',
      db: 7,
    },
  };

  config.typeorm = {
    type: 'postgres',
    host: '${database.host}',
    port: '${database.port}',
    username: '${database.username}',
    password: '${database.password}',
    database: 'account_platform',
    migrationsRun: true,
    synchronize: false,
    logging: ['query'],
    maxQueryExecutionTime: 1500, // 慢查询记录
    entityPrefix: 'mp_',
  };

  config.rabbitmq = {
    enable: true,
    clients: {
      messageServe: {
        url: {
          protocol: 'amqp',
          hostname: '${rabbitmq.host}',
          port: '${rabbitmq.port}',
          username: '${rabbitmq.username}',
          password: '${rabbitmq.password}',
          locale: 'en_US',
          frameMax: 0,
          heartbeat: 0,
          vhost: '${rabbitmq.virtual-host}',
        },
        reconnectTime: 5000, // 重连时间间隔
        options: {},
        exchanges: {
          messageExchange: {
            name: 'message_exchange', // 消息推送交换机
            type: 'direct',
            options: {
              durable: true,
            },
          },
          delayMessageExchange: {
            name: 'delay_message_exchange', // 延迟消息交换机
            type: 'direct',
            options: {
              durable: true,
            },
          },
          dlxMessageExchange: {
            name: 'dlx_message_exchange', // 消息失败的死信交换机
            type: 'direct',
            options: {
              durable: true,
            },
          },
        },
        queues: {
          messageQueue: {
            // 推送消息队列
            exchange: 'message_exchange',
            name: 'message_queue',
            keys: {
              wechatTemplateMessage: 'wechat/message/template',
            },
            options: {
              exclusive: false,
              durable: true,
              maxPriority: 10,
              prefetch: 1,
              deadLetterRoutingKey: 'wechat/message/template',
              deadLetterExchange: 'dlx_message_exchange',
            },
            autoSubscribe: true, // 启动时自动开启订阅。
            subscribeOptions: {}, // 开启自动订阅时的消费者配置，不开启不用配置
          },
          dlxMessageQueue: {
            // 推送失败的队列，目前不做失败后的处理
            exchange: 'dlx_message_exchange',
            name: 'dlx_message_queue',
            keys: {
              wechatTemplateMessage: 'wechat/message/template', // 这里是deadLetterRoutingKey
            },
            options: {
              exclusive: false,
              durable: true,
              maxPriority: 10,
              prefetch: 1,
            },
            autoSubscribe: false, // 关闭自动订阅。
            subscribeOptions: {}, // 开启自动订阅时的消费者配置，不开启不用配置
          },
          delayMessageQueue: {
            // 延迟推送消息队列，这里不做消费处理，定时超时后，转发给message_exchange
            exchange: 'delay_message_exchange',
            name: 'delay_message_queue',
            keys: {
              wechatTemplateMessage: 'wechat/message/template',
            },
            options: {
              exclusive: false,
              durable: true,
              maxPriority: 10,
              prefetch: 1,
              deadLetterRoutingKey: 'wechat/message/template',
              deadLetterExchange: 'message_exchange',
            },
            autoSubscribe: false, // 关闭自动订阅。
            subscribeOptions: {}, // 开启自动订阅时的消费者配置，不开启不用配置
          },
          messageCallbackQueue: {
            // 消息推送结果回调失败的队列，供调用服务使用，防止回调消息遗漏
            exchange: 'message_exchange',
            name: 'message_callback_queue',
            keys: {
              wechatTemplateMessage: 'wechat/message/template/callback',
            },
            options: {
              exclusive: false,
              durable: true,
              maxPriority: 10,
              prefetch: 1,
            },
            autoSubscribe: false, // 启动时自动开启订阅。
          },
        },
      },
    },
  };

  return config;
};
