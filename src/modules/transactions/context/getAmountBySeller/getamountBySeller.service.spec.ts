import { Test, TestingModule } from '@nestjs/testing';

import { mockUserTransaction } from '../../../../shared/tests/users.mock';
import { GetAmountBySellerService } from './getAmountBySeller.service';
import { ListUserTransactionsService } from 'src/modules/user/context/listUserTransactions/listUserTransactions.service';
import { NotFoundException } from '@nestjs/common';

const mockListUserTransactionService = {
  execute: jest.fn(() => [mockUserTransaction]),
};

describe('Get Amount By Seller Service', () => {
  let service: GetAmountBySellerService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAmountBySellerService,
        {
          provide: ListUserTransactionsService,
          useValue: mockListUserTransactionService,
        },
      ],
    }).compile();

    service = module.get<GetAmountBySellerService>(GetAmountBySellerService);
  });

  it('Should return the total amount of transactions on success', async () => {
    const response = await service.execute('any_user_id');
    expect(response).toEqual(5000);
  });

  it('Should  throw a Not Found Exception if no user is found', async () => {
    jest
      .spyOn(mockListUserTransactionService, 'execute')
      .mockReturnValueOnce([]);
    const response = service.execute('any_user_id');
    await expect(response).rejects.toBeInstanceOf(NotFoundException);
  });
});
