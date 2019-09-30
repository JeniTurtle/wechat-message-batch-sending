import { makeBindingClass, Options } from 'graphql-binding';
import { GraphQLResolveInfo, GraphQLSchema } from 'graphql';
import { IResolvers } from 'graphql-tools/dist/Interfaces';
import * as schema from './schema.graphql';

export interface Query {
  menus: <T = WxAccount>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T>;
}

export interface Mutation {}

export interface Subscription {}

export interface Binding {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
  request: <T = any>(query: string, variables?: { [key: string]: any }) => Promise<T>;
  delegate(
    operation: 'query' | 'mutation',
    fieldName: string,
    args: {
      [key: string]: any;
    },
    infoOrQuery?: GraphQLResolveInfo | string,
    options?: Options,
  ): Promise<any>;
  delegateSubscription(
    fieldName: string,
    args?: {
      [key: string]: any;
    },
    infoOrQuery?: GraphQLResolveInfo | string,
    options?: Options,
  ): Promise<AsyncIterator<any>>;
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new (...args: any[]): T;
}

export const Binding = makeBindingClass<BindingConstructor<Binding>>({ schema });

/**
 * Types
 */

export type WxMsgIsDelay = 'YES' | 'NO';

export type WxMsgTaskProgress = 'READY' | 'COMPLETE';

export type WxMsgTaskType = 'DEFAULT' | 'TEMPLATE';

export type WxTmPushStatus = 'DEFAULT' | 'SUCCESS' | 'FAILED';

export interface BaseWhereInput {
  id_eq?: String | null;
  id_in?: String[] | String | null;
  createdAt_eq?: String | null;
  createdAt_lt?: String | null;
  createdAt_lte?: String | null;
  createdAt_gt?: String | null;
  createdAt_gte?: String | null;
  createdById_eq?: String | null;
  updatedAt_eq?: String | null;
  updatedAt_lt?: String | null;
  updatedAt_lte?: String | null;
  updatedAt_gt?: String | null;
  updatedAt_gte?: String | null;
  updatedById_eq?: String | null;
  deletedAt_all?: Boolean | null;
  deletedAt_eq?: String | null;
  deletedAt_lt?: String | null;
  deletedAt_lte?: String | null;
  deletedAt_gt?: String | null;
  deletedAt_gte?: String | null;
  deletedById_eq?: String | null;
}

export interface BaseGraphQLObject {
  id: ID_Output;
  createdAt: DateTime;
  createdById: String;
  updatedAt?: DateTime | null;
  updatedById?: String | null;
  deletedAt?: DateTime | null;
  deletedById?: String | null;
  version: Int;
}

export interface DeleteResponse {
  id: ID_Output;
}

export interface BaseModel extends BaseGraphQLObject {
  id: ID_Output;
  createdAt: DateTime;
  createdById: String;
  updatedAt?: DateTime | null;
  updatedById?: String | null;
  deletedAt?: DateTime | null;
  deletedById?: String | null;
  version: Int;
}

export interface BaseModelUUID extends BaseGraphQLObject {
  id: ID_Output;
  createdAt: DateTime;
  createdById: String;
  updatedAt?: DateTime | null;
  updatedById?: String | null;
  deletedAt?: DateTime | null;
  deletedById?: String | null;
  version: Int;
}

export interface StandardDeleteResponse {
  id: ID_Output;
}

export interface WxAccount extends BaseGraphQLObject {
  id: ID_Output;
  createdAt: DateTime;
  createdById: String;
  updatedAt?: DateTime | null;
  updatedById?: String | null;
  deletedAt?: DateTime | null;
  deletedById?: String | null;
  version: Int;
  accountName: String;
  appId: String;
  appSecret: String;
  identityId: String;
  messageTokenUrl: String;
}

export interface WxMessageTask extends BaseGraphQLObject {
  id: ID_Output;
  createdAt: DateTime;
  createdById: String;
  updatedAt?: DateTime | null;
  updatedById?: String | null;
  deletedAt?: DateTime | null;
  deletedById?: String | null;
  version: Int;
  batchCount: Int;
  params: String;
  executor?: WxAccount | null;
  executorId: String;
  type?: WxMsgTaskType | null;
  isDelay?: WxMsgIsDelay | null;
  planTime?: DateTime | null;
  progress?: WxMsgTaskProgress | null;
}

export interface WxTemplateMessage extends BaseGraphQLObject {
  id: ID_Output;
  createdAt: DateTime;
  createdById: String;
  updatedAt?: DateTime | null;
  updatedById?: String | null;
  deletedAt?: DateTime | null;
  deletedById?: String | null;
  version: Int;
  openid: String;
  templateId: String;
  url?: String | null;
  color?: String | null;
  miniprogramAppId?: String | null;
  miniprogramPagepath?: String | null;
  data: String;
  executor?: WxAccount | null;
  executorId: String;
  messageTask?: WxMessageTask | null;
  messageTaskId: String;
  status?: WxTmPushStatus | null;
  failReason?: String | null;
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
The javascript `Date` as string. Type represents date and time as the ISO Date string.
*/
export type DateTime = Date | string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;
