import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ListUserTransactionsService } from './listUserTransactions.service';
import { ListUserTransactionsRequestDTO } from 'src/shared/dtos/users/listUserTransactionsRequest.dto';
import { UserDTO } from 'src/shared/dtos/users/user.dto';

@ApiTags('users')
@Controller()
export class ListUserTransactionsController {
  constructor(private service: ListUserTransactionsService) {}

  @Get('/transactions')
  @ApiOkResponse({
    description: 'Return an array with the user(s) info',
    type: [UserDTO],
  })
  @HttpCode(HttpStatus.OK)
  public async handle(@Query() data: ListUserTransactionsRequestDTO) {
    try {
      return await this.service.execute(data);
    } catch (error) {
      throw new HttpException(
        error.response.message,
        error.response.statusCode,
      );
    }
  }
}
