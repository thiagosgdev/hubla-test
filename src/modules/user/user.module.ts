import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { userProviders } from './user.provider';
import { DatabaseModule } from 'src/infra/database.module';
import { User } from 'src/shared/entities/user.entity';
import { BcryptProvider } from 'src/shared/providers/HasherProvider/bcrypt.provider';
import { JwtProvider } from 'src/shared/providers/EncryptProvider/jwt.provider';
import { SignUpService } from './context/signup/signUp.service';
import { SignUpController } from './context/signup/signUp.controller';
import { jwtConfig } from 'src/config/jwt';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.registerAsync(jwtConfig()),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    ...userProviders,
    { provide: 'HASH_PROVIDER', useClass: BcryptProvider },
    { provide: 'ENCRYPTER_PROVIDER', useClass: JwtProvider },
    SignUpService,
  ],
  controllers: [SignUpController],
})
export class UserModule {}
