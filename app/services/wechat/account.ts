import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseService } from '@plugin/typeorm-graphql';
import { WxAccount } from '@entity/wechat/account';

@Service('WxAccountService')
export default class WxAccountService extends BaseService<WxAccount> {
  constructor(@InjectRepository(WxAccount) readonly repository: Repository<WxAccount>) {
    super(WxAccount, repository);
  }
}
