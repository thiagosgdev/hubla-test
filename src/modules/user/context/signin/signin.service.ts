import {
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { User } from 'src/shared/entities/user.entity';
import { Hasher } from 'src/shared/providers/HasherProvider/protocols/hasher';
import { envConfig } from 'src/config/env';
import {
  SigninRequestDTO,
  SigninResponseDTO,
} from 'src/shared/dtos/users/signinRequest.dto';

export class SigninService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('HASH_PROVIDER')
    private hasher: Hasher,
    private jwtService: JwtService,
  ) {}
  async login(data: SigninRequestDTO): Promise<SigninResponseDTO> {
    const { email, password } = data;

    const userCredentials = await this.userRepository.findOne({
      select: ['email', 'password'],
      where: {
        email,
      },
    });

    if (!userCredentials) {
      throw new NotFoundException('No user found!');
    }

    const isValid = await this.hasher.compareHash(
      password,
      userCredentials.password,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid email/password');
    }

    const user = await this.userRepository.findOne({
      where: { email },
    });

    const role = user.role;

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
