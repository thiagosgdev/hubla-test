import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { routerConfig } from './config/routes';
import { envConfig } from './config/env';
import { TransactionModule } from './modules/transactions/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envConfig().typeormHost,
      port: envConfig().typeormPort,
      username: envConfig().typeormUsername,
      password: envConfig().typeormPassword,
      database: envConfig().typeormDatabase,
      entities: [envConfig().typeormEntities],
      migrations: [envConfig().typeormMigrations],
    }),
    RouterModule.register(routerConfig),
    UserModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
