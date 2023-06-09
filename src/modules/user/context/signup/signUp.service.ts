import {
  Injectable,
  Inject,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { SignUpRequestDTO } from 'src/shared/dtos/users/signUpRequest.dto';
import { User } from 'src/shared/entities/user.entity';
import { Hasher } from 'src/shared/providers/HasherProvider/protocols/hasher';
import { envConfig } from 'src/config/env';
import { UserWithTokenDTO } from 'src/shared/dtos/users/user.dto';

@Injectable()
export class SignUpService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('HASH_PROVIDER')
    private hasher: Hasher,
    private jwtService: JwtService,
  ) {}

  async execute(data: SignUpRequestDTO): Promise<UserWithTokenDTO> {
    const { email, password, passwordConfirmation } = data;

    if (password !== passwordConfirmation) {
      throw new BadRequestException('Password not match! Try again.');
    }

    const exists = await this.userRepository.findOne({ where: { email } });
    if (exists) {
      throw new ConflictException(
        'E-mail already in use! Try to recover your password',
      );
    }

    const hashedPassword = await this.hasher.createHash(password);

    const user = this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    const role = user.role;

    delete user.password;

    const token = this.jwtService.sign(
      { userId: user.id, role },
      { expiresIn: envConfig().jwtExpiresIn },
    );

    const refreshToken = this.jwtService.sign(
      { userId: user.id, role },
      { expiresIn: envConfig().jwtRefreshExpiresIn },
    );

    return { token, refreshToken, user };
  }
}
