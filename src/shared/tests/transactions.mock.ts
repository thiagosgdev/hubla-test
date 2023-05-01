import { TransactionType } from '../dtos/transactions/transaction.dto';
import { Transaction } from '../entities/transaction.entity';

export const mockFileProviderResponse = {
  type: 0,
  date: new Date(),
  productName: 'DESENVOLVEDOR FULLSTACK',
  price: 5000,
  seller: 'JON DOE',
};

export const mockTransaction: Transaction = {
  id: 'any_id',
  productName: 'any_product',
  price: 5000,
  transactionDate: new Date(),
  type: TransactionType[0] as unknown as TransactionType,
  sellerId: 'any_seller_id',
  user: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};
