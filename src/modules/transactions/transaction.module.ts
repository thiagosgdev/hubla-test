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
    CreateTransactionService,
    FindUserByNameService,
  ],
  controllers: [CreateTransactionController],
})
export class TransactionModule {}
