import fs from 'fs/promises';
import path from 'path';
import { FileConversor } from './protocols/fileConversor';
import { TransactionFileResponse } from 'src/shared/dtos/transactions/transaction.dto';

export class FsProvider implements FileConversor {
  async readToStringArray(fileName: string): Promise<string[]> {
    const filePath = path.join(__dirname, fileName);

    const file = (await fs.readFile(filePath)).toString('utf8');

    return file.split('\n');
  }

  async sliceTransactionsToJson(
    lines: string[],
  ): Promise<TransactionFileResponse[]> {
    const transactions: TransactionFileResponse[] = [];
    lines.forEach((line) => {
      const transaction = {
        type: Number(line.slice(0, 1)),
        date: line.slice(1, 26),
        productName: line.slice(26, 56).trim(),
        price: Number(line.slice(56, 66)),
        seller: line.slice(66, 85),
      };

      if (
        transaction.type &&
        transaction.date &&
        transaction.productName &&
        transaction.price &&
        transaction.seller
      ) {
        transactions.push(transaction);
      }
    });

    return transactions;
  }
}
