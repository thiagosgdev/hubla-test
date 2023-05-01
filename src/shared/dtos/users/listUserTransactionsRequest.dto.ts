import { ApiProperty } from '@nestjs/swagger';

export class ListUserTransactionsRequestDTO {
  @ApiProperty({
    example: '30e8a68b-6f2a-4eea-af19-ac1f976a00d9',
    type: 'uuid',
    required: false,
  })
  userId?: string;

  @ApiProperty({
    example: 'Jon Doe',
    type: 'string',
    required: false,
  })
  userName?: string;
}
