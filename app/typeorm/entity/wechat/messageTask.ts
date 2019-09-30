import { PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID } from 'type-graphql';
import {
  BaseModel,
  Model,
  ManyToOne,
  EnumField,
  IntField,
  TextField,
  DateField,
} from '../../../../plugin/typeorm-graphql';
import { WxAccount } from '../../entity/wechat/account';

export enum WxMsgTaskType {
  DEFAULT = 0,
  TEMPLATE = 1,
}

export enum WxMsgIsDelay {
  YES = 1,
  NO = 0,
}

export enum WxMsgTaskProgress {
  READY = 0,
  COMPLETE = 1,
}

@Model()
export class WxMessageTask extends BaseModel {
  @PrimaryGeneratedColumn({ comment: '唯一ID' })
  @Field(_type => ID)
  id: string;

  @IntField({ comment: '批处理数量' })
  batchCount: number;

  @TextField({ comment: '执行的相关参数，json字符串' })
  params: string;

  @ManyToOne(_type => WxAccount, wxAccount => wxAccount.wxMessageTask, {
    comment: '执行者',
  })
  executor: WxAccount;
  executorId: string;

  @EnumField('WxMsgTaskType', WxMsgTaskType, {
    defaultValue: WxMsgTaskType.DEFAULT,
    comment: '任务类型，1模板消息，0其他',
  })
  type: WxMsgTaskType;

  @EnumField('WxMsgIsDelay', WxMsgIsDelay, {
    defaultValue: WxMsgIsDelay.NO,
    comment: '是否延迟执行，1是，0否',
  })
  isDelay: WxMsgIsDelay;

  @DateField({ comment: '计划执行时间', nullable: true })
  planTime?: Date;

  @EnumField('WxMsgTaskProgress', WxMsgTaskProgress, {
    defaultValue: WxMsgTaskProgress.READY,
    comment: '任务进度，0开始执行；1执行完成',
  })
  progress: WxMsgTaskProgress;
}
