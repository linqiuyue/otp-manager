import { Field, InputType } from '@nestjs/graphql';
import { DeepPartial } from 'typeorm';
import { Item } from '../item.entity';

@InputType()
export class ItemInput implements DeepPartial<Item> {
  @Field()
  name: string;

  @Field()
  secret: string;

  @Field({ nullable: true })
  backupCodes?: string;
}
