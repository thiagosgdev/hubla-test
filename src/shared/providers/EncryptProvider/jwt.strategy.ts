import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envConfig } from 'src/config/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: (
        _request: Request,
        rawJwtToken: any,
        done: (err: any, secretOrKey?: string | Buffer) => void,
      ) => {
        void this.isBlocked(rawJwtToken).then((isBlocked) => {
          if (isBlocked) {
            done(new UnauthorizedException('Invalid access!'));
          } else {
            done(null, envConfig().jwtSecret);
          }
        });
      },
    });
  }

  async validate(payload: { userId: string; role: string }) {
    return {
      userId: payload.userId,
      role: payload.role,
    };
  }
}
