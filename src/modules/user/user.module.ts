import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { jwtConfig } from 'src/config/jwt';
import { userProviders } from './user.provider';
import { DatabaseModule } from 'src/infra/database.module';
import { User } from 'src/shared/entities/user.entity';
import { BcryptProvider } from 'src/shared/providers/HasherProvider/bcrypt.provider';
import { JwtProvider } from 'src/shared/providers/EncryptProvider/jwt.provider';
import { SignUpService } from './context/signup/signUp.service';
import { SignUpController } from './context/signup/signUp.controller';
import { SigninService } from './context/signin/signin.service';
import { SigninController } from './context/signin/signin.controller';
import { FindUserByNameService } from './context/findUserByName/findUserByName.service';
import { ListUserTransactionsController } from './context/listUserTransactions/listUserTransactions.controller';
import { ListUserTransactionsService } from './context/listUserTransactions/listUserTransactions.service';

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
    SigninService,
    FindUserByNameService,
    ListUserTransactionsService,
  ],
  controllers: [
    SignUpController,
    SigninController,
    ListUserTransactionsController,
  ],
})
export class UserModule {}
