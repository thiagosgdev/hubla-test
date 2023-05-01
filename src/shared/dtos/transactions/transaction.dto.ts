import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export enum TransactionType {
  sale_creator,
  sale_associate,
  comission_paid,
  comission_received,
}

export type TransactionFileResponse = {
  type: number;
  date: string;
  productName: string;
  price: number;
  seller: string;
};

export class TransactionDTO {
  @ApiProperty({
    example: '658e0d03-9d3a-40bf-936f-79bfbb56fef3',
  })
  id: string;

  @ApiProperty({
    example: 'DESENVOLVEDOR FULLSTACK',
  })
  productName: string;

  @ApiProperty({
    example: 4000,
  })
  price: number;

  @ApiProperty({
    example: 'sale_creator',
  })
  type: TransactionType;

  @IsDate()
  @ApiProperty({
    example: new Date(),
  })
  transactionDate: Date;

  @IsDate()
  @ApiProperty({
    example: '2f9cd8d2-d68c-4fe9-9f2a-57f20562ceb5',
  })
  sellerId: string;

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
