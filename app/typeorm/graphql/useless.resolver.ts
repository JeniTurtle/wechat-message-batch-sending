import { Args, Query, Resolver, Ctx } from 'type-graphql';
import { Context } from 'egg';
import { WxAccount } from '../entity/wechat/account';

@Resolver(WxAccount)
export class WxAccountResolver {
  @Query(() => WxAccount)
  menus(@Ctx() _ctx: Context): WxAccount {
    return new WxAccount();
  }
}
