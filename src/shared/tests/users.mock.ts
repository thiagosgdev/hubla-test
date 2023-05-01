import { SignUpRequestDTO } from '../dtos/users/signUpRequest.dto';
import { SigninResponseDTO } from '../dtos/users/signinRequest.dto';
import { userRoles } from '../dtos/users/user.dto';
import { User } from '../entities/user.entity';
import { mockTransaction } from './transactions.mock';

export const mockUser: User = {
  id: 'any_id',
  name: 'Test',
  email: 'test@test.com',
  password: null,
  role: userRoles[1] as unknown as userRoles,
  transactions: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const mockUserTransaction: User = {
  id: 'any_id',
  name: 'Test',
  email: 'test@test.com',
  password: null,
  role: userRoles[1] as unknown as userRoles,
  transactions: [mockTransaction],
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const mockSignUpRequestDTO = (): SignUpRequestDTO => {
  return {
    name: 'any_name',
    email: 'any_email@test.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  };
};

export const mockSigninResponseDTO = (): SigninResponseDTO => {
  return {
    token: 'any_token',
    refreshToken: 'any_token',
    user: mockUser,
  };
};

export const mockUserRepository = {
  findOne: (): Promise<User | null> => {
    return Promise.resolve(null);
  },
  create: () => {
    return Promise.resolve(mockUser);
  },
  save: () => {
    return Promise.resolve(mockUser);
  },
};

export const mockHashProvider = {
  compareHash: jest.fn(() => {
    Promise.resolve(false);
  }),
  createHash: jest.fn(() => {
    Promise.resolve('any_hashed');
  }),
};
