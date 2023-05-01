import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/shared/entities/user.entity';
import { userRoles } from 'src/shared/dtos/users/user.dto';
import { Hasher } from 'src/shared/providers/HasherProvider/protocols/hasher';

type CreateUserParams = {
  name: string;
  email: string;
  password: string;
  role: userRoles;
};

export class CreateUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('HASH_PROVIDER')
    private hasher: Hasher,
  ) {}
  async execute(data: CreateUserParams): Promise<User> {
    const hashedPassword = await this.hasher.createHash(data.password);
    const user = this.userRepository.create({
      ...data,
      name: data.name.toLocaleUpperCase(),
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    return user;
  }
}
