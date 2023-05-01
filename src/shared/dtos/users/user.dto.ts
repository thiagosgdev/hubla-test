export enum userRoles {
  creator,
  associate,
  admin,
  user,
}

import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsDate } from 'class-validator';
import { TransactionDTO } from '../transactions/transaction.dto';
import { mockTransaction } from 'src/shared/tests/transactions.mock';

export class UserDTO {
  @ApiProperty({
    example: '',
  })
  id: string;

  @ApiProperty({
    example: 'Jon Doe',
  })
  name: string;

  @ApiProperty({
    example: 'jon@test.com',
  })
  email: string;

  @ApiProperty({
    example: 'associate',
  })
  role: userRoles;

  @ApiProperty({
    example: [mockTransaction],
  })
  transactions: TransactionDTO[];

  @Exclude()
  password: string;

  @IsDate()
  @ApiProperty({
    example: new Date(),
  })
  createdAt: Date;

  @IsDate()
  @ApiProperty({
    example: null,
  })
  updatedAt: Date;

  @IsDate()
  @ApiProperty({
    example: null,
  })
  deletedAt: Date;
}

export class UserWithTokenDTO {
  @ApiProperty()
  user: UserDTO;

  @ApiProperty()
  token: string;

  @ApiProperty()
  refreshToken: string;
}
