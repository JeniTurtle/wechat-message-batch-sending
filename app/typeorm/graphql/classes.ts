// This file has been auto-generated by Warthog.  Do not update directly as it
// will be re-written.  If you need to change this file, update models or add
// new TypeGraphQL objects
import { GraphQLID as ID } from 'graphql';
import { ArgsType, Field as TypeGraphQLField, Float, InputType as TypeGraphQLInputType, Int } from 'type-graphql';
import { registerEnumType } from 'type-graphql';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { GraphQLJSONObject } = require('graphql-type-json');

import { BaseWhereInput, PaginationArgs } from 'warthog';
import { WxMsgTaskType } from '../entity/wechat/messageTask';
import { WxMsgIsDelay } from '../entity/wechat/messageTask';
import { WxMsgTaskProgress } from '../entity/wechat/messageTask';
import { WxTmPushStatus } from '../entity/wechat/templateMessage';
// @ts-ignore
import { WxAccount } from '../entity/wechat/account';
// @ts-ignore
import { WxMessageTask } from '../entity/wechat/messageTask';
// @ts-ignore
import { WxTemplateMessage } from '../entity/wechat/templateMessage';

export enum WxAccountOrderByEnum {
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',

  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC',

  deletedAt_ASC = 'deletedAt_ASC',
  deletedAt_DESC = 'deletedAt_DESC',

  accountName_ASC = 'accountName_ASC',
  accountName_DESC = 'accountName_DESC',

  appId_ASC = 'appId_ASC',
  appId_DESC = 'appId_DESC',

  appSecret_ASC = 'appSecret_ASC',
  appSecret_DESC = 'appSecret_DESC',

  identityId_ASC = 'identityId_ASC',
  identityId_DESC = 'identityId_DESC',

  messageTokenUrl_ASC = 'messageTokenUrl_ASC',
  messageTokenUrl_DESC = 'messageTokenUrl_DESC',
}

registerEnumType(WxAccountOrderByEnum, {
  name: 'WxAccountOrderByInput',
});

@TypeGraphQLInputType()
export class WxAccountWhereInput extends BaseWhereInput {
  @TypeGraphQLField({ nullable: true })
  accountName_eq?: string;

  @TypeGraphQLField({ nullable: true })
  accountName_contains?: string;

  @TypeGraphQLField({ nullable: true })
  accountName_startsWith?: string;

  @TypeGraphQLField({ nullable: true })
  accountName_endsWith?: string;

  @TypeGraphQLField(() => [String], { nullable: true })
  accountName_in?: string[];

  @TypeGraphQLField(() => ID, { nullable: true })
  appId_eq?: string;

  @TypeGraphQLField(() => [ID], { nullable: true })
  appId_in?: string[];

  @TypeGraphQLField({ nullable: true })
  appSecret_eq?: string;

  @TypeGraphQLField({ nullable: true })
  appSecret_contains?: string;

  @TypeGraphQLField({ nullable: true })
  appSecret_startsWith?: string;

  @TypeGraphQLField({ nullable: true })
  appSecret_endsWith?: string;

  @TypeGraphQLField(() => [String], { nullable: true })
  appSecret_in?: string[];

  @TypeGraphQLField(() => ID, { nullable: true })
  identityId_eq?: string;

  @TypeGraphQLField(() => [ID], { nullable: true })
  identityId_in?: string[];

  @TypeGraphQLField({ nullable: true })
  messageTokenUrl_eq?: string;

  @TypeGraphQLField({ nullable: true })
  messageTokenUrl_contains?: string;

  @TypeGraphQLField({ nullable: true })
  messageTokenUrl_startsWith?: string;

  @TypeGraphQLField({ nullable: true })
  messageTokenUrl_endsWith?: string;

  @TypeGraphQLField(() => [String], { nullable: true })
  messageTokenUrl_in?: string[];
}

@TypeGraphQLInputType()
export class WxAccountWhereUniqueInput {
  @TypeGraphQLField(() => String)
  id?: string;
}

@TypeGraphQLInputType()
export class WxAccountCreateInput {
  @TypeGraphQLField()
  accountName!: string;

  @TypeGraphQLField()
  appId!: string;

  @TypeGraphQLField()
  appSecret!: string;

  @TypeGraphQLField()
  identityId!: string;

  @TypeGraphQLField()
  messageTokenUrl!: string;
}

@TypeGraphQLInputType()
export class WxAccountUpdateInput {
  @TypeGraphQLField({ nullable: true })
  accountName?: string;

  @TypeGraphQLField({ nullable: true })
  appId?: string;

  @TypeGraphQLField({ nullable: true })
  appSecret?: string;

  @TypeGraphQLField({ nullable: true })
  identityId?: string;

  @TypeGraphQLField({ nullable: true })
  messageTokenUrl?: string;
}

@ArgsType()
export class WxAccountWhereArgs extends PaginationArgs {
  @TypeGraphQLField(() => WxAccountWhereInput, { nullable: true })
  where?: WxAccountWhereInput;

  @TypeGraphQLField(() => WxAccountOrderByEnum, { nullable: true })
  orderBy?: WxAccountOrderByEnum;
}

@ArgsType()
export class WxAccountCreateManyArgs {
  @TypeGraphQLField(() => [WxAccountCreateInput])
  data!: WxAccountCreateInput[];
}

@ArgsType()
export class WxAccountUpdateArgs {
  @TypeGraphQLField() data!: WxAccountUpdateInput;
  @TypeGraphQLField() where!: WxAccountWhereUniqueInput;
}

export enum WxMessageTaskOrderByEnum {
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',

  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC',

  deletedAt_ASC = 'deletedAt_ASC',
  deletedAt_DESC = 'deletedAt_DESC',

  batchCount_ASC = 'batchCount_ASC',
  batchCount_DESC = 'batchCount_DESC',

  params_ASC = 'params_ASC',
  params_DESC = 'params_DESC',

  executorId_ASC = 'executorId_ASC',
  executorId_DESC = 'executorId_DESC',

  type_ASC = 'type_ASC',
  type_DESC = 'type_DESC',

  isDelay_ASC = 'isDelay_ASC',
  isDelay_DESC = 'isDelay_DESC',

  planTime_ASC = 'planTime_ASC',
  planTime_DESC = 'planTime_DESC',

  progress_ASC = 'progress_ASC',
  progress_DESC = 'progress_DESC',
}

registerEnumType(WxMessageTaskOrderByEnum, {
  name: 'WxMessageTaskOrderByInput',
});

@TypeGraphQLInputType()
export class WxMessageTaskWhereInput extends BaseWhereInput {
  @TypeGraphQLField({ nullable: true })
  batchCount_eq?: number;

  @TypeGraphQLField({ nullable: true })
  batchCount_gt?: number;

  @TypeGraphQLField({ nullable: true })
  batchCount_gte?: number;

  @TypeGraphQLField({ nullable: true })
  batchCount_lt?: number;

  @TypeGraphQLField({ nullable: true })
  batchCount_lte?: number;

  @TypeGraphQLField(() => [Int], { nullable: true })
  batchCount_in?: number[];

  @TypeGraphQLField({ nullable: true })
  params_eq?: string;

  @TypeGraphQLField({ nullable: true })
  params_contains?: string;

  @TypeGraphQLField({ nullable: true })
  params_startsWith?: string;

  @TypeGraphQLField({ nullable: true })
  params_endsWith?: string;

  @TypeGraphQLField(() => [String], { nullable: true })
  params_in?: string[];

  @TypeGraphQLField(() => ID, { nullable: true })
  executorId_eq?: string;

  @TypeGraphQLField(() => [ID], { nullable: true })
  executorId_in?: string[];

  @TypeGraphQLField(() => WxMsgTaskType, { nullable: true })
  type_eq?: WxMsgTaskType;

  @TypeGraphQLField(() => [WxMsgTaskType], { nullable: true })
  type_in?: WxMsgTaskType[];

  @TypeGraphQLField(() => WxMsgIsDelay, { nullable: true })
  isDelay_eq?: WxMsgIsDelay;

  @TypeGraphQLField(() => [WxMsgIsDelay], { nullable: true })
  isDelay_in?: WxMsgIsDelay[];

  @TypeGraphQLField({ nullable: true })
  planTime_gt?: Date;

  @TypeGraphQLField({ nullable: true })
  planTime_gte?: Date;

  @TypeGraphQLField({ nullable: true })
  planTime_lt?: Date;

  @TypeGraphQLField({ nullable: true })
  planTime_lte?: Date;

  @TypeGraphQLField(() => WxMsgTaskProgress, { nullable: true })
  progress_eq?: WxMsgTaskProgress;

  @TypeGraphQLField(() => [WxMsgTaskProgress], { nullable: true })
  progress_in?: WxMsgTaskProgress[];
}

@TypeGraphQLInputType()
export class WxMessageTaskWhereUniqueInput {
  @TypeGraphQLField(() => String)
  id?: string;
}

@TypeGraphQLInputType()
export class WxMessageTaskCreateInput {
  @TypeGraphQLField()
  batchCount!: number;

  @TypeGraphQLField()
  params!: string;

  @TypeGraphQLField()
  executorId!: string;

  @TypeGraphQLField(() => WxMsgTaskType)
  type!: WxMsgTaskType;

  @TypeGraphQLField(() => WxMsgIsDelay)
  isDelay!: WxMsgIsDelay;

  @TypeGraphQLField({ nullable: true })
  planTime?: Date;

  @TypeGraphQLField(() => WxMsgTaskProgress)
  progress!: WxMsgTaskProgress;
}

@TypeGraphQLInputType()
export class WxMessageTaskUpdateInput {
  @TypeGraphQLField({ nullable: true })
  batchCount?: number;

  @TypeGraphQLField({ nullable: true })
  params?: string;

  @TypeGraphQLField({ nullable: true })
  executorId?: string;

  @TypeGraphQLField(() => WxMsgTaskType, { nullable: true })
  type?: WxMsgTaskType;

  @TypeGraphQLField(() => WxMsgIsDelay, { nullable: true })
  isDelay?: WxMsgIsDelay;

  @TypeGraphQLField({ nullable: true })
  planTime?: Date;

  @TypeGraphQLField(() => WxMsgTaskProgress, { nullable: true })
  progress?: WxMsgTaskProgress;
}

@ArgsType()
export class WxMessageTaskWhereArgs extends PaginationArgs {
  @TypeGraphQLField(() => WxMessageTaskWhereInput, { nullable: true })
  where?: WxMessageTaskWhereInput;

  @TypeGraphQLField(() => WxMessageTaskOrderByEnum, { nullable: true })
  orderBy?: WxMessageTaskOrderByEnum;
}

@ArgsType()
export class WxMessageTaskCreateManyArgs {
  @TypeGraphQLField(() => [WxMessageTaskCreateInput])
  data!: WxMessageTaskCreateInput[];
}

@ArgsType()
export class WxMessageTaskUpdateArgs {
  @TypeGraphQLField() data!: WxMessageTaskUpdateInput;
  @TypeGraphQLField() where!: WxMessageTaskWhereUniqueInput;
}

export enum WxTemplateMessageOrderByEnum {
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',

  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC',

  deletedAt_ASC = 'deletedAt_ASC',
  deletedAt_DESC = 'deletedAt_DESC',

  openid_ASC = 'openid_ASC',
  openid_DESC = 'openid_DESC',

  templateId_ASC = 'templateId_ASC',
  templateId_DESC = 'templateId_DESC',

  url_ASC = 'url_ASC',
  url_DESC = 'url_DESC',

  color_ASC = 'color_ASC',
  color_DESC = 'color_DESC',

  miniprogramAppId_ASC = 'miniprogramAppId_ASC',
  miniprogramAppId_DESC = 'miniprogramAppId_DESC',

  miniprogramPagepath_ASC = 'miniprogramPagepath_ASC',
  miniprogramPagepath_DESC = 'miniprogramPagepath_DESC',

  data_ASC = 'data_ASC',
  data_DESC = 'data_DESC',

  executorId_ASC = 'executorId_ASC',
  executorId_DESC = 'executorId_DESC',

  messageTaskId_ASC = 'messageTaskId_ASC',
  messageTaskId_DESC = 'messageTaskId_DESC',

  status_ASC = 'status_ASC',
  status_DESC = 'status_DESC',

  failReason_ASC = 'failReason_ASC',
  failReason_DESC = 'failReason_DESC',
}

registerEnumType(WxTemplateMessageOrderByEnum, {
  name: 'WxTemplateMessageOrderByInput',
});

@TypeGraphQLInputType()
export class WxTemplateMessageWhereInput extends BaseWhereInput {
  @TypeGraphQLField({ nullable: true })
  openid_eq?: string;

  @TypeGraphQLField({ nullable: true })
  openid_contains?: string;

  @TypeGraphQLField({ nullable: true })
  openid_startsWith?: string;

  @TypeGraphQLField({ nullable: true })
  openid_endsWith?: string;

  @TypeGraphQLField(() => [String], { nullable: true })
  openid_in?: string[];

  @TypeGraphQLField(() => ID, { nullable: true })
  templateId_eq?: string;

  @TypeGraphQLField(() => [ID], { nullable: true })
  templateId_in?: string[];

  @TypeGraphQLField({ nullable: true })
  url_eq?: string;

  @TypeGraphQLField({ nullable: true })
  url_contains?: string;

  @TypeGraphQLField({ nullable: true })
  url_startsWith?: string;

  @TypeGraphQLField({ nullable: true })
  url_endsWith?: string;

  @TypeGraphQLField(() => [String], { nullable: true })
  url_in?: string[];

  @TypeGraphQLField({ nullable: true })
  color_eq?: string;

  @TypeGraphQLField({ nullable: true })
  color_contains?: string;

  @TypeGraphQLField({ nullable: true })
  color_startsWith?: string;

  @TypeGraphQLField({ nullable: true })
  color_endsWith?: string;

  @TypeGraphQLField(() => [String], { nullable: true })
  color_in?: string[];

  @TypeGraphQLField(() => ID, { nullable: true })
  miniprogramAppId_eq?: string;

  @TypeGraphQLField(() => [ID], { nullable: true })
  miniprogramAppId_in?: string[];

  @TypeGraphQLField({ nullable: true })
  miniprogramPagepath_eq?: string;

  @TypeGraphQLField({ nullable: true })
  miniprogramPagepath_contains?: string;

  @TypeGraphQLField({ nullable: true })
  miniprogramPagepath_startsWith?: string;

  @TypeGraphQLField({ nullable: true })
  miniprogramPagepath_endsWith?: string;

  @TypeGraphQLField(() => [String], { nullable: true })
  miniprogramPagepath_in?: string[];

  @TypeGraphQLField({ nullable: true })
  data_eq?: string;

  @TypeGraphQLField({ nullable: true })
  data_contains?: string;

  @TypeGraphQLField({ nullable: true })
  data_startsWith?: string;

  @TypeGraphQLField({ nullable: true })
  data_endsWith?: string;

  @TypeGraphQLField(() => [String], { nullable: true })
  data_in?: string[];

  @TypeGraphQLField(() => ID, { nullable: true })
  executorId_eq?: string;

  @TypeGraphQLField(() => [ID], { nullable: true })
  executorId_in?: string[];

  @TypeGraphQLField(() => ID, { nullable: true })
  messageTaskId_eq?: string;

  @TypeGraphQLField(() => [ID], { nullable: true })
  messageTaskId_in?: string[];

  @TypeGraphQLField(() => WxTmPushStatus, { nullable: true })
  status_eq?: WxTmPushStatus;

  @TypeGraphQLField(() => [WxTmPushStatus], { nullable: true })
  status_in?: WxTmPushStatus[];

  @TypeGraphQLField({ nullable: true })
  failReason_eq?: string;

  @TypeGraphQLField({ nullable: true })
  failReason_contains?: string;

  @TypeGraphQLField({ nullable: true })
  failReason_startsWith?: string;

  @TypeGraphQLField({ nullable: true })
  failReason_endsWith?: string;

  @TypeGraphQLField(() => [String], { nullable: true })
  failReason_in?: string[];
}

@TypeGraphQLInputType()
export class WxTemplateMessageWhereUniqueInput {
  @TypeGraphQLField(() => String)
  id?: string;
}

@TypeGraphQLInputType()
export class WxTemplateMessageCreateInput {
  @TypeGraphQLField()
  openid!: string;

  @TypeGraphQLField()
  templateId!: string;

  @TypeGraphQLField({ nullable: true })
  url?: string;

  @TypeGraphQLField({ nullable: true })
  color?: string;

  @TypeGraphQLField({ nullable: true })
  miniprogramAppId?: string;

  @TypeGraphQLField({ nullable: true })
  miniprogramPagepath?: string;

  @TypeGraphQLField()
  data!: string;

  @TypeGraphQLField()
  executorId!: string;

  @TypeGraphQLField()
  messageTaskId!: string;

  @TypeGraphQLField(() => WxTmPushStatus)
  status!: WxTmPushStatus;

  @TypeGraphQLField({ nullable: true })
  failReason?: string;
}

@TypeGraphQLInputType()
export class WxTemplateMessageUpdateInput {
  @TypeGraphQLField({ nullable: true })
  openid?: string;

  @TypeGraphQLField({ nullable: true })
  templateId?: string;

  @TypeGraphQLField({ nullable: true })
  url?: string;

  @TypeGraphQLField({ nullable: true })
  color?: string;

  @TypeGraphQLField({ nullable: true })
  miniprogramAppId?: string;

  @TypeGraphQLField({ nullable: true })
  miniprogramPagepath?: string;

  @TypeGraphQLField({ nullable: true })
  data?: string;

  @TypeGraphQLField({ nullable: true })
  executorId?: string;

  @TypeGraphQLField({ nullable: true })
  messageTaskId?: string;

  @TypeGraphQLField(() => WxTmPushStatus, { nullable: true })
  status?: WxTmPushStatus;

  @TypeGraphQLField({ nullable: true })
  failReason?: string;
}

@ArgsType()
export class WxTemplateMessageWhereArgs extends PaginationArgs {
  @TypeGraphQLField(() => WxTemplateMessageWhereInput, { nullable: true })
  where?: WxTemplateMessageWhereInput;

  @TypeGraphQLField(() => WxTemplateMessageOrderByEnum, { nullable: true })
  orderBy?: WxTemplateMessageOrderByEnum;
}

@ArgsType()
export class WxTemplateMessageCreateManyArgs {
  @TypeGraphQLField(() => [WxTemplateMessageCreateInput])
  data!: WxTemplateMessageCreateInput[];
}

@ArgsType()
export class WxTemplateMessageUpdateArgs {
  @TypeGraphQLField() data!: WxTemplateMessageUpdateInput;
  @TypeGraphQLField() where!: WxTemplateMessageWhereUniqueInput;
}