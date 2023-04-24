import { envConfig } from 'src/config/env';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: envConfig().typeormHost,
        port: envConfig().typeormPort,
        username: envConfig().typeormUsername,
        password: envConfig().typeormPassword,
        database: envConfig().typeormDatabase,
        entities: [envConfig().typeormEntities],
        migrations: [envConfig().typeormMigrations],
      });

      return dataSource.initialize();
    },
  },
];
