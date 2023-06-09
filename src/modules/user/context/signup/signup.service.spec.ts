import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import MockDate from 'mockdate';
import { BadRequestException, ConflictException } from '@nestjs/common';

import { JwtProvider } from '../../../../shared/providers/EncryptProvider/jwt.provider';
import {
  mockHashProvider,
  mockSignUpRequestDTO,
  mockUser,
  mockUserRepository,
} from '../../../../shared/tests/users.mock';
import { SignUpService } from './signUp.service';

describe('Sign up Service', () => {
  let service: SignUpService;

  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => {
              null;
            }),
          },
        },
        {
          provide: 'USER_REPOSITORY',
          useValue: mockUserRepository,
        },
        {
          provide: 'HASH_PROVIDER',
          useValue: mockHashProvider,
        },
        {
          provide: 'ENCRYPTER_PROVIDER',
          useClass: JwtProvider,
        },
      ],
    }).compile();

    service = module.get<SignUpService>(SignUpService);
  });

  it('Should return the user and tokens created on SignUp success', async () => {
    const response = await service.execute(mockSignUpRequestDTO());
    expect(response).toHaveProperty('user');
    expect(response).toHaveProperty('token');
  });

  it('Should return a ConflicException if the e-mail already exists', async () => {
    jest.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(mockUser);
    const response = service.execute(mockSignUpRequestDTO());
    await expect(response).rejects.toBeInstanceOf(ConflictException);
  });

  it('Should return a BadRequestException if the password does not match', async () => {
    const response = service.execute({
      name: 'any_name',
      email: 'any_email@test.com',
      password: 'any_password',
      passwordConfirmation: 'wrong',
    });
    await expect(response).rejects.toBeInstanceOf(BadRequestException);
  });
});
