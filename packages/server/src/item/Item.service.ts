import { EntityService } from '@nest-boost/typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Item } from './item.entity';

@Injectable()
export class ItemService extends EntityService<Item> {
  constructor(
    @InjectRepository(Item)
    readonly repository: Repository<Item>,
  ) {
    super(repository);
    return this;
  }
}
