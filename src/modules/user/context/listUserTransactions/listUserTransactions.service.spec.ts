import { Test, TestingModule } from '@nestjs/testing';

import { mockUserTransaction } from '../../../../shared/tests/users.mock';
import { ListUserTransactionsService } from './listUserTransactions.service';
import { Like } from 'typeorm';

const mockUserRepository = {
  find: jest.fn(() => [mockUserTransaction]),
};

describe('List User Transaction Service', () => {
  let service: ListUserTransactionsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListUserTransactionsService,
        {
          provide: 'USER_REPOSITORY',
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<ListUserTransactionsService>(
      ListUserTransactionsService,
    );
  });

  it('Should return the user with his transactions', async () => {
    const response = await service.execute({ userName: 'Test' });
    expect(response).toEqual([mockUserTransaction]);
  });

  it('Should return an empty array if no user is found', async () => {
    jest.spyOn(mockUserRepository, 'find').mockReturnValueOnce([]);
    const response = await service.execute({ userName: 'Test' });
    expect(response).toEqual([]);
  });

  it('Should call with userName if it is passed', async () => {
    const spyFind = jest.spyOn(mockUserRepository, 'find');
    await service.execute({ userName: 'Test' });
    expect(spyFind).toHaveBeenCalledWith({
      where: { name: Like(`%${'Test'}%`) },
      relations: ['transactions'],
    });
  });

  it('Should call with id if it is passed', async () => {
    const spyFind = jest.spyOn(mockUserRepository, 'find');
    await service.execute({ userId: 'any_id' });
    expect(spyFind).toHaveBeenCalledWith({
      where: { id: 'any_id' },
      relations: ['transactions'],
    });
  });
});
