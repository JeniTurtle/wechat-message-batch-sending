import { PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID } from 'type-graphql';
import { BaseModel, Model, StringField } from '../../../../plugin/typeorm-graphql';

@Model()
export class WxAccount extends BaseModel {
  @PrimaryGeneratedColumn({ comment: '唯一ID' })
  @Field(_type => ID)
  id: string;

  @StringField({ maxLength: 64, comment: '账户名称' })
  accountName: string;

  @StringField({ maxLength: 64, comment: '微信AppId' })
  appId: string;

  @StringField({ maxLength: 128, comment: '微信AppSecret' })
  appSecret: string;

  @StringField({ maxLength: 128, comment: '下发的身份标识' })
  identityId: string;

  @StringField({ maxLength: 512, comment: '消息回调地址' })
  messageTokenUrl: string;
}
