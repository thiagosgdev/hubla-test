import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/shared/entities/user.entity';

export class FindUserByNameService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  async execute(name: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { name } });
  }
}
