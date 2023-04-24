import { ConfigModule, ConfigService } from '@nestjs/config';
import { envConfig } from '../env';

export function jwtConfig() {
  return {
    imports: [ConfigModule],
    useFactory: async () => ({
      secret: envConfig().jwtSecret,
    }),
    inject: [ConfigService],
  };
}
