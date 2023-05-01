import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from 'src/infra/database.module';
import { Transaction } from 'src/shared/entities/transaction.entity';
import { FsProvider } from 'src/shared/providers/FileProvider/fs.provider';
import { CreateTransactionService } from './context/createTransaction/createTransaction.service';
import { CreateTransactionController } from './context/createTransaction/createTransaction.controller';
import { transactionProviders } from './transaction.provider';
import { UserModule } from '../user/user.module';
import { FindUserByNameService } from '../user/context/findUserByName/findUserByName.service';
import { User } from 'src/shared/entities/user.entity';
import { userProviders } from '../user/user.provider';
import { GetAmountBySellerService } from './context/getAmountBySeller/getAmountBySeller.service';
import { GetAmountBySellerController } from './context/getAmountBySeller/getAmountBySeller.controller';
import { CreateUserService } from '../user/context/createUser/createUser.service';
import { BcryptProvider } from 'src/shared/providers/HasherProvider/bcrypt.provider';
import { ListUserTransactionsService } from '../user/context/listUserTransactions/listUserTransactions.service';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    TypeOrmModule.forFeature([Transaction, User]),
  ],
  providers: [
    ...transactionProviders,
    ...userProviders,
    { provide: 'FILE_PROVIDER', useClass: FsProvider },
    { provide: 'HASH_PROVIDER', useClass: BcryptProvider },
    CreateTransactionService,
    CreateUserService,
    FindUserByNameService,
    GetAmountBySellerService,
    ListUserTransactionsService,
  ],
  controllers: [CreateTransactionController, GetAmountBySellerController],
})
export class TransactionModule {}
