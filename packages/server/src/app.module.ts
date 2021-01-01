import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-snake-naming-strategy';

import { Item } from './item/item.entity';
import { ItemService } from './item/Item.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ItemResolver } from './item/item.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      path: '/graphql',
      autoSchemaFile: true,
      sortSchema: true,
      context: ({ req }) => ({ req }),
      fieldResolverEnhancers: ['guards'],
      introspection: true,
      playground: true,
      tracing: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        url: configService.get('DATABASE_URL'),
        timezone: 'Z',
        synchronize: true,
        entities: [Item],
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
    TypeOrmModule.forFeature([Item]),
  ],
  controllers: [AppController],
  providers: [AppService, ItemService, ItemResolver],
})
export class AppModule {}
