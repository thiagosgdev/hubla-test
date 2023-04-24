import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { routerConfig } from './config/routes';
import { envConfig } from './config/env';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
