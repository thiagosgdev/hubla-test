import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { SigninService } from './signin.service';
import { SigninRequestDTO } from 'src/shared/dtos/users/signinRequest.dto';
import { UserWithTokenDTO } from 'src/shared/dtos/users/user.dto';

@ApiTags('users')
@Controller()
export class SigninController {
  constructor(private signinService: SigninService) {}

  @Post('/signin')
  @ApiOkResponse({
    description: 'The user object and tokens will be returned',
    type: UserWithTokenDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'This will be returned when a invalid credential is provided.',
  })
  @ApiNotFoundResponse({
    description: 'This will be returned no user is found with given e-mail.',
  })
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
