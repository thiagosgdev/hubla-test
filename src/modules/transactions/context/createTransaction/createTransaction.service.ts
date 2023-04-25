import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { FileConversor } from 'src/shared/providers/FileProvider/protocols/fileConversor';
import { Transaction } from 'src/shared/entities/transaction.entity';
import { TransactionType } from 'src/shared/dtos/transactions/transaction.dto';
import { FindUserByNameService } from 'src/modules/user/context/findUserByName/findUserByName.service';
import { type } from 'os';

export class CreateTransactionService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: Repository<Transaction>,
    @Inject('FILE_PROVIDER')
    private fileConversor: FileConversor,
    private findUserByNameService: FindUserByNameService,
  ) {}
  async execute(file: string): Promise<object> {
    const lines = file.split('\n');

    const fileConverted = await this.fileConversor.sliceTransactionsToJson(
      lines,
    );

    let typeValue: TransactionType;
    const transactions = await Promise.all(
      fileConverted.map(async (item) => {
        typeValue = Object.entries(TransactionType).find(
          (value) => Number(value[1]) + 1 === item.type,
        )[0] as unknown as TransactionType;

        const userName = item.seller.toLocaleUpperCase();
        const user = await this.findUserByNameService.execute(userName);

        const { id: user_id } = user;

        const transaction = this.transactionRepository.create({
          ...item,
          type: typeValue,
          sellerId: user_id,
          transactionDate: item.date,
        });

        await this.transactionRepository.save(transaction);

        return transaction;
      }),
    );

    return transactions;
  }
}
