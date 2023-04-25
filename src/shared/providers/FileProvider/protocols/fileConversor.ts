import { TransactionFileResponse } from 'src/shared/dtos/transactions/transaction.dto';

export interface FileConversor {
  sliceTransactionsToJson(lines: string[]): Promise<TransactionFileResponse[]>;
  readToStringArray(fileName: string): Promise<string[]>;
}
