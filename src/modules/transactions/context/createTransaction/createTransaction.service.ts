import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { FileConversor } from 'src/shared/providers/FileProvider/protocols/fileConversor';
import { Transaction } from 'src/shared/entities/transaction.entity';
import { TransactionType } from 'src/shared/dtos/transactions/transaction.dto';
import { FindUserByNameService } from 'src/modules/user/context/findUserByName/findUserByName.service';
import { CreateUserService } from 'src/modules/user/context/createUser/createUser.service';
import { envConfig } from 'src/config/env';
import { userRoles } from 'src/shared/dtos/users/user.dto';

export class CreateTransactionService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: Repository<Transaction>,
    @Inject('FILE_PROVIDER')
    private fileConversor: FileConversor,
    private findUserByNameService: FindUserByNameService,
    private createUserService: CreateUserService,
  ) {}
  async execute(file: string): Promise<Transaction[]> {
    const lines = file.split('\n');

    const fileConverted = await this.fileConversor.sliceTransactionsToJson(
      lines,
    );

    const transactions = [];

    for (const item of fileConverted) {
      const typeValue = Object.entries(TransactionType).find(
        (value) => Number(value[1]) + 1 === item.type,
      )[0] as unknown as TransactionType;

      const userName = item.seller.toLocaleUpperCase();

      let user = await this.findUserByNameService.execute(userName);

      if (!user) {
        const email =
          userName.replace(/\s/g, '').toLocaleLowerCase() + '@mail.com';

        const role = (item.type === 0 || item.type === 2
          ? 'creator'
          : 'associate') as unknown as userRoles;

        user = await this.createUserService.execute({
          name: userName,
          password: envConfig().defaultUserPassword,
          email,
          role,
        });
      }

      const { id: user_id } = user;

      const transaction = this.transactionRepository.create({
        ...item,
        type: typeValue,
        sellerId: user_id,
        transactionDate: item.date,
      });

      await this.transactionRepository.save(transaction);

      transactions.push(transaction);
    }

    return transactions;
  }
}
