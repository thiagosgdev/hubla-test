import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetAmountBySellerService } from './getAmountBySeller.service';

@ApiTags('Transactions')
@Controller()
export class GetAmountBySellerController {
  constructor(private service: GetAmountBySellerService) {}

  @Get('/amount/:userId')
  @ApiOkResponse({
    description: 'Returns the sum of transactions from a single user',
  })
  @ApiNotFoundResponse({
    description: 'This will be returned if no user is found.',
  })
  @HttpCode(HttpStatus.OK)
  public async handle(@Param('userId') userId: string) {
    return this.service.execute(userId);
  }
}
