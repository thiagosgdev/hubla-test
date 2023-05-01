import { Test, TestingModule } from '@nestjs/testing';

import {
  mockHashProvider,
  mockUser,
  mockUserRepository,
} from '../../../../shared/tests/users.mock';
import { CreateUserService } from './createUser.service';
import { userRoles } from 'src/shared/dtos/users/user.dto';

const mockCreateUserParams = {
  name: 'any_name',
  password: 'any_password',
  email: 'any_mail@mail.com',
  role: 'creator' as unknown as userRoles,
};
describe('Find User by Name Service', () => {
  let service: CreateUserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: 'USER_REPOSITORY',
          useValue: mockUserRepository,
        },
        {
          provide: 'HASH_PROVIDER',
          useValue: mockHashProvider,
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
  });

  it('Should call execute with the correct params', async () => {
    const spyExecute = jest.spyOn(service, 'execute');
    await service.execute(mockCreateUserParams);
    expect(spyExecute).toHaveBeenCalledWith(mockCreateUserParams);
  });

  it('Should return the user on create success', async () => {
    const response = await service.execute(mockCreateUserParams);
    expect(response).toEqual(mockUser);
  });
});
