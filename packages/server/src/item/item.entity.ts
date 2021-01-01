import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({ unique: true })
  token: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  secret: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  backupCodes?: string;

  @Field()
  @CreateDateColumn()
  public createAt: Date;

  @Field()
  @CreateDateColumn()
  public updateAt: Date;
}
