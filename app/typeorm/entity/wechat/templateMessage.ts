import { PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID } from 'type-graphql';
import { BaseModel, Model, StringField, ManyToOne, EnumField, TextField } from '../../../../plugin/typeorm-graphql';
import { WxAccount } from '../../entity/wechat/account';
import { WxMessageTask } from '../../entity/wechat/messageTask';

export enum WxTmPushStatus {
  DEFAULT = 0,
  SUCCESS = 1,
  FAILED = 2,
}

@Model()
export class WxTemplateMessage extends BaseModel {
  @PrimaryGeneratedColumn({ comment: '唯一ID' })
  @Field(_type => ID)
  id: string;

  @StringField({ maxLength: 128, comment: '微信用户openid' })
  openid: string;

  @StringField({ maxLength: 128, comment: '微信模板消息ID' })
  templateId: string;

  @StringField({ maxLength: 512, comment: '消息跳转web地址', nullable: true })
  url?: string;

  @StringField({ maxLength: 64, comment: '模板内容字体颜色', nullable: true })
  color?: string;

  @StringField({ maxLength: 128, comment: '跳转的微信小程序appId', nullable: true })
  miniprogramAppId?: string;

  @StringField({ maxLength: 512, comment: '跳转的微信小程序地址', nullable: true })
  miniprogramPagepath?: string;

  @TextField({ comment: '小程序模板消息内容，json字符串' })
  data: string;

  @ManyToOne(_type => WxAccount, wxAccount => wxAccount.wxTemplateMessage, {
    comment: '执行者',
  })
  executor: WxAccount;
  executorId: string;

  @ManyToOne(_type => WxMessageTask, wxMessageTask => wxMessageTask.wxTemplateMessage, {
    comment: '所属任务，用来统计属于哪次操作',
  })
  messageTask: WxAccount;
  messageTaskId: string;

  @EnumField('WxTmPushStatus', WxTmPushStatus, {
    defaultValue: WxTmPushStatus.DEFAULT,
    comment: '消息状态，1推送成功，2推送失败，0其他',
  })
  status: WxTmPushStatus;

  @TextField({ comment: '推送失败原因', nullable: true })
  failReason?: string;
}
