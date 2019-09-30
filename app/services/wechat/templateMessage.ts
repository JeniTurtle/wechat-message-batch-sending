import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseService } from '@plugin/typeorm-graphql';
import { WxTemplateMessage } from '@entity/wechat/templateMessage';

@Service('WxTemplateMessageService')
export default class WxTemplateMessageService extends BaseService<WxTemplateMessage> {
  constructor(@InjectRepository(WxTemplateMessage) readonly repository: Repository<WxTemplateMessage>) {
    super(WxTemplateMessage, repository);
  }
}
