import { DataSource } from 'typeorm';
import { envConfig } from '../../config/env';

export const dataSource = new DataSource({
  type: 'postgres',
  host: envConfig().typeormHost,
  port: envConfig().typeormPort,
  username: envConfig().typeormUsername,
  password: envConfig().typeormPassword,
  database: envConfig().typeormDatabase,
  entities: [envConfig().typeormEntities],
  migrations: [envConfig().typeormMigrations],
});
