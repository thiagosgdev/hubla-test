import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { CreateTransactionService } from './createTransaction.service';

@ApiTags('transactions')
@Controller()
export class CreateTransactionController {
  constructor(private createTransactionService: CreateTransactionService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  public async handle(@UploadedFile() file: Express.Multer.File) {
    const transactions = await this.createTransactionService.execute(
      file.buffer.toString(),
    );
    return transactions;
  }
}
