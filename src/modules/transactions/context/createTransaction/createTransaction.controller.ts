import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CreateTransactionService } from './createTransaction.service';
import { TransactionDTO } from 'src/shared/dtos/transactions/transaction.dto';

@ApiTags('Transactions')
@Controller()
export class CreateTransactionController {
  constructor(private createTransactionService: CreateTransactionService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Returns the transactions inserted in the db',
    type: [TransactionDTO],
  })
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  public async handle(@UploadedFile() file: Express.Multer.File) {
    const transactions = await this.createTransactionService.execute(
      file.buffer.toString(),
    );
    return transactions;
  }
}
