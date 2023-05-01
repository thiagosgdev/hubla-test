import { Inject, NotFoundException } from '@nestjs/common';
import { FindOperator, Like, Repository } from 'typeorm';
import { User } from 'src/shared/entities/user.entity';
import { ListUserTransactionsRequestDTO } from 'src/shared/dtos/users/listUserTransactionsRequest.dto';

type WhereParams = {
  name?: FindOperator<string>;
  id?: string;
};
export class ListUserTransactionsService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  async execute(data?: ListUserTransactionsRequestDTO): Promise<User[]> {
    const { userId, userName } = data;

    const where: WhereParams = {};

    if (userName) {
      where.name = Like(`%${userName}%`);
    }

    if (userId) {
      where.id = userId;
    }

    const users = await this.userRepository.find({
      where,
      relations: ['transactions'],
    });

    return users;
  }
}
