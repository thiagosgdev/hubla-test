import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SigninService } from './signin.service';
import { SigninRequestDTO } from 'src/shared/dtos/users/signinRequest.dto';

@ApiTags('users')
@Controller()
export class SigninController {
  constructor(private signinService: SigninService) {}

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  public async handle(@Body() data: SigninRequestDTO) {
    try {
      return await this.signinService.login(data);
    } catch (error) {
      throw new HttpException(
        error.response.message,
        error.response.statusCode,
      );
    }
  }
}
