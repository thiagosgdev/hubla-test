import 'dotenv/config';

export const envConfig = () => ({
  port: process.env.PORT,
  typeormType: process.env.TYPEORM_CONNECTION,
  typeormHost: process.env.TYPEORM_HOST,
  typeormUsername: process.env.TYPEORM_USERNAME,
  typeormPassword: process.env.TYPEORM_PASSWORD,
  typeormDatabase: process.env.TYPEORM_DATABASE,
  typeormPort: Number(process.env.TYPEORM_PORT),
  typeormEntities: process.env.TYPEORM_ENTITIES,
  typeormEntitiesDir: process.env.TYPEORM_ENTITIES_DIR,
  typeormMigrations: process.env.TYPEORM_MIGRATIONS,
  typeormMigrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  jwtSecret: process.env.JWT_SECRET,
  defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
});
