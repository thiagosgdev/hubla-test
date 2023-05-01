import MockDate from 'mockdate';
import { Test, TestingModule } from '@nestjs/testing';

import { mockUserTransaction } from '../../../../shared/tests/users.mock';
import { ListUserTransactionsController } from './listUserTransactions.controller';
import { ListUserTransactionsService } from './listUserTransactions.service';

const mockListUserTransactionsService = {
  execute: jest.fn((dto) => [mockUserTransaction]),
};

describe('List User Transaction Controller', () => {
  let controller: ListUserTransactionsController;
  let service: ListUserTransactionsService;
  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListUserTransactionsController],
      providers: [ListUserTransactionsService],
    })
      .overrideProvider(ListUserTransactionsService)
      .useValue(mockListUserTransactionsService)
      .compile();

    controller = module.get<ListUserTransactionsController>(
      ListUserTransactionsController,
    );
    service = module.get<ListUserTransactionsService>(
      ListUserTransactionsService,
    );
  });
  it('Should call List User Transaction Service with the correct values', async () => {
    const loginSpy = jest.spyOn(service, 'execute');
    await controller.handle({ userName: 'Test' });
    expect(loginSpy).toHaveBeenCalledWith({ userName: 'Test' });
  });

  it('Should return the user and his transactions', async () => {
    const response = await controller.handle({ userName: 'Test' });
    expect(response).toEqual([mockUserTransaction]);
  });

  it('Should return an empty array if no user is found', async () => {
    jest.spyOn(service, 'execute').mockReturnValueOnce(Promise.resolve([]));
    const response = await controller.handle({ userName: 'No existing user' });
    await expect(response).toEqual([]);
  });
});
