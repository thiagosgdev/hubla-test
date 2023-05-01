import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { CreateTransactionService } from './createTransaction.service';
import { Transaction } from 'src/shared/entities/transaction.entity';
import {
  TransactionFileResponse,
  TransactionType,
} from 'src/shared/dtos/transactions/transaction.dto';
import { FileConversor } from 'src/shared/providers/FileProvider/protocols/fileConversor';
import { FindUserByNameService } from 'src/modules/user/context/findUserByName/findUserByName.service';
import { User } from 'src/shared/entities/user.entity';
import { CreateUserService } from 'src/modules/user/context/createUser/createUser.service';
import { mockUser } from 'src/shared/tests/users.mock';
import { mockTransaction } from 'src/shared/tests/transactions.mock';

const mockTransactionRepository = {
  create: jest.fn(() => mockTransaction),
  save: jest.fn(),
};

const mockFileProvider: FileConversor = {
  sliceTransactionsToJson: jest.fn(() =>
    Promise.resolve([mockTransactionFileResponse]),
  ),
  readToStringArray: jest.fn(() => Promise.resolve['any_lines']),
};

const mockTransactionFileResponse: TransactionFileResponse = {
  type: 1,
  date: 'any_data',
  productName: 'any_product',
  price: 1000,
  seller: 'any_seller_name',
};

const mockFindUserByNameService = {
  execute: jest.fn(() => Promise.resolve(mockUser)),
};

const mockCreateUserService = {
  execute: jest.fn(() => Promise.resolve(mockUser)),
};

const mockUserRepository = {
  findOne: (): Promise<User | null> => {
    return Promise.resolve(mockUser);
  },
  create: (): Promise<User | null> => {
    return Promise.resolve(mockUser);
  },
};

describe('Create Transaction Service', () => {
  let service: CreateTransactionService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTransactionService,
        {
          provide: 'TRANSACTION_REPOSITORY',
          useValue: mockTransactionRepository,
        },
        {
          provide: 'FILE_PROVIDER',
          useValue: mockFileProvider,
        },
        {
          provide: 'USER_REPOSITORY',
          useValue: mockUserRepository,
        },
        {
          provide: FindUserByNameService,
          useValue: mockFindUserByNameService,
        },
        {
          provide: CreateUserService,
          useValue: mockCreateUserService,
        },
      ],
    }).compile();

    service = module.get<CreateTransactionService>(CreateTransactionService);
  });

  it('Should return the transactions created', async () => {
    const response = await service.execute('any_file_string');
    expect(response).toEqual([mockTransaction]);
  });

  it('Should call CreateUserService if no user is found', async () => {
    jest.spyOn(mockFindUserByNameService, 'execute').mockReturnValueOnce(null);
    const spyCreateUser = jest.spyOn(mockCreateUserService, 'execute');
    await service.execute('any_file_string');
    expect(spyCreateUser).toHaveBeenCalled();
  });
});
