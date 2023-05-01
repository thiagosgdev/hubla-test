import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { mockUser } from '../../../../shared/tests/users.mock';
import { FindUserByNameService } from './findUserByName.service';

const mockUserRepository = {
  findOne: jest.fn(() => mockUser),
};

describe('Find User by Name Service', () => {
  let service: FindUserByNameService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByNameService,
        {
          provide: 'USER_REPOSITORY',
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<FindUserByNameService>(FindUserByNameService);
  });

  it('Should return the user on success', async () => {
    const response = await service.execute('any_name');
    expect(response).toEqual(mockUser);
  });

  it('Should throw NotFoundException if no user is found', async () => {
    jest.spyOn(mockUserRepository, 'findOne').mockReturnValueOnce(null);
    const response = service.execute('any_name');
    await expect(response).rejects.toBeInstanceOf(NotFoundException);
  });
});
