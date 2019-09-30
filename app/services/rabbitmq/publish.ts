import { Service } from 'typedi';
import { EggBaseService } from '@plugin/typeorm-graphql';

@Service('RBMQPublishService')
export default class RBMQPublishService extends EggBaseService {
  /**
   * 获取交换机和队列配置信息
   * @param vhostName
   * @param exchangeName
   * @param queueName
   */
  private getQueueInfo(vhostName, exchangeName, queueName) {
    const { exchanges, queues } = this.app.config.rabbitmq.clients[vhostName];
    const exchange = exchanges[exchangeName].name;
    const queue = queues[queueName].name;
    const routingKeys = queues[queueName].keys;
    const { clients } = this.app.rabbitmq;
    const channel = clients.get(vhostName);
    return { channel, exchange, queue, routingKeys };
  }

  /**
   * 发布消息到队列
   * @param channel
   * @param exchange
   * @param key
   * @param data
   */
  private sendToQueue(channel, exchange, key, data, opts = {}): boolean {
    const message = {
      exchange,
      key,
      message: data,
      options: {
        priority: 10,
        persistent: true,
        mandatory: true,
        ...opts,
      },
    };
    return channel.publish(message);
  }

  /**
   * 获取消息的交换机和队列信息
   */
  public getMessageQueueInfo() {
    return this.getQueueInfo('messageServe', 'messageExchange', 'messageQueue');
  }

  /**
   * 获取消息回调结果的交换机和队列信息
   */
  public getMessageCallbackQueueInfo() {
    return this.getQueueInfo('messageServe', 'messageExchange', 'messageCallbackQueue');
  }

  /**
   * 获取失败消息的交换机和队列信息
   */
  public getFailedMessageQueueInfo() {
    return this.getQueueInfo('messageServe', 'dlxMessageExchange', 'dlxMessageQueue');
  }

  /**
   * 获取延迟消息的交换机和队列信息
   */
  public getDelayMessageQueueInfo() {
    return this.getQueueInfo('messageServe', 'delayMessageExchange', 'delayMessageQueue');
  }

  /**
   * 获取延迟消息的死信交换机和队列信息
   */
  public getDlxDelayMessageQueueInfo() {
    return this.getQueueInfo('messageServe', 'dlxDelayMessageExchange', 'dlxDelayMessageQueue');
  }

  /**
   * 发布消息到message_queue
   * @param data
   */
  public sendToMessageQueue(data: object): boolean {
    const { channel, exchange, routingKeys } = this.getMessageQueueInfo();
    return this.sendToQueue(channel, exchange, routingKeys.wechatTemplateMessage, data);
  }

  /**
   * 发布消息到delay_message_queue
   * @param data
   * @param expiration  过期时间（毫秒）
   */
  public sendToDelayMessageQueue(data: object, expiration: number): boolean {
    const { channel, exchange, routingKeys } = this.getDelayMessageQueueInfo();
    return this.sendToQueue(channel, exchange, routingKeys.wechatTemplateMessage, data, { expiration });
  }

  /**
   * 发布消息到message_callback_queue
   * @param data
   */
  public sendToMessageCallbackQueue(data: object): boolean {
    const { channel, exchange, routingKeys } = this.getMessageCallbackQueueInfo();
    return this.sendToQueue(channel, exchange, routingKeys.wechatTemplateMessage, data);
  }
}
