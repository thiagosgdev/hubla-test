import { TransactionType } from 'src/shared/dtos/transactions/transaction.dto';
import { Inject, NotFoundException } from '@nestjs/common';
import { ListUserTransactionsService } from 'src/modules/user/context/listUserTransactions/listUserTransactions.service';

export class GetAmountBySellerService {
  constructor(
    @Inject(ListUserTransactionsService)
    private listService: ListUserTransactionsService,
  ) {}
  async execute(userId: string): Promise<number> {
    const user = await this.listService.execute({ userId });

    if (user.length < 1) {
      throw new NotFoundException('No user found.');
    }

    const { transactions } = user[0];
    const amount = transactions.reduce((acc, current) => {
      const type = current.type.toString();

      if (type === TransactionType[2]) {
        acc -= current.price;
      } else {
        acc += current.price;
      }
      return acc;
    }, 0);

    return amount;
  }
}
