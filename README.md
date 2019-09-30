# account-platform

## Description

基于eggjs、typeorm、rabbitmq、postgreSQL开发的一套微信消息批量定时推送服务。

主要功能包括：

1、无登录授权认证，服务双方通过传入identity_id以及约定好的加密解密方式，获取accessToken，有效期20分钟。

2、微信模板消息批量推送及批量定时推送。调用方调用批量推送接口，传入accessToken及相关参数，服务会先解析数据写入到rabbitmq队列中，并记录任务信息到数据库中。消息队列消费者每次只取一个，多实例进行，在获取到数据后，调用微信api进行推送，并将发送结果写入到redis中。当任务下所有消息全部发送完成后，从redis获取所有实例缓存的结果，把状态写入到数据库中，并清除redis缓存。如果有发送失败的消息，丢到死信交换机里，供后续操作。最后调用配置好的回调地址，把结果返回给调用方，如果调用方接口服务异常，为了确保结果不丢失，会丢到一个处理回调结果的rabbitmq队列，供调用服务处理。
定时推送则利用rabbitmq死信交换机的功能，新建延迟队列，并设置消息有效期，到期后去丢到正常消息推送队列中。

具体接口信息打开swagger文档查看。

注：该项目使用场景基于eureka服务，如果不使用eureka，先修改config/plugin.ts，把eureka插件关闭。

再修改app.ts和agent.ts，把configHandler.ts相关的方法注释掉，最后改下数据库、redis相关的配置项即可。

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7021/graphql
$ open http://127.0.0.1:7021/swagger-ui/index.html
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- 使用 `graphql:codegen` 生成graphql类型代码，该命令需要先启动项目。

- 使用 `db:migrate:generate` 生成数据库变更记录，注意！该命令需要先启动项目，因为数据库相关信息是动态获取的。

- 使用 `db:migrate` 把变更记录同步到数据库


### Requirement

- Node.js 8.x
- Typescript 2.8+


## swagger文档
-- 启动server后, 打开网址: http://127.0.0.1:7021/swagger-ui/index.html