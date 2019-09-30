import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseService } from '@plugin/typeorm-graphql';
import { WxMessageTask } from '@entity/wechat/messageTask';

@Service('WxMessageTaskService')
export default class WxMessageTaskService extends BaseService<WxMessageTask> {
  constructor(@InjectRepository(WxMessageTask) readonly repository: Repository<WxMessageTask>) {
    super(WxMessageTask, repository);
  }
}
