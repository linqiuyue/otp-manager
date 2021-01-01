import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ItemInput } from './input/item.input';
import { Item } from './item.entity';
import { ItemService } from './Item.service';
import crypto from 'crypto';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Item)
export class ItemResolver {
  constructor(readonly itemService: ItemService) {
    return this;
  }

  @Query(() => Item)
  async item(@Args('name') name: string): Promise<Item> {
    const item = await this.itemService.repository.findOne({ where: { name } });

    if (!item) {
      throw new NotFoundException('找不到项目');
    }

    return item;
  }

  @Mutation(() => Item)
  async createItem(@Args('input') input: ItemInput): Promise<Item> {
    const item = this.itemService.repository.create({
      ...input,
      token: crypto
        .randomBytes(8)
        .toString('hex')
        .toUpperCase(),
    });

    return this.itemService.repository.save(item);
  }

  @Mutation(() => Item)
  async updateItem(
    @Args('token') token: string,
    @Args('input') input: ItemInput,
  ): Promise<Item> {
    const item = await this.itemService.repository.findOne({
      where: { token },
    });

    if (!item) {
      throw new NotFoundException('找不到项目');
    }

    Object.keys(input).forEach(key => {
      item[key] = input[key];
    });

    return this.itemService.repository.save(item);
  }
}
