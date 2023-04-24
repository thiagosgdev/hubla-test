import { UnauthorizedException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

import { Decrypter } from './protocols/decrypter';
import { Encrypter } from './protocols/encrypter';
import { EncrypterRefresh } from './protocols/encrypterExpirationDate';
import { envConfig } from 'src/config/env';

export class JwtProvider implements Encrypter, Decrypter, EncrypterRefresh {
  async encrypt(value: string): Promise<string> {
    const accessToken = sign({}, envConfig().jwtSecret, {
      subject: value,
      expiresIn: envConfig().jwtExpiresIn,
    });
    return accessToken;
  }

  decrypt(token: string): string {
    let id = '';
    verify(token, envConfig().jwtSecret, async (err, payload) => {
      if (!err) {
        id = String(payload.sub);
      }
    });
    if (!id) {
      throw new UnauthorizedException('Not a valid token! Please signin again');
    }
    return id;
  }

  async encryptRefresh(value: string): Promise<string> {
    const refreshToken = sign({}, envConfig().jwtSecret, {
      subject: value,
      expiresIn: envConfig().jwtRefreshExpiresIn,
    });
    return refreshToken;
  }
}
