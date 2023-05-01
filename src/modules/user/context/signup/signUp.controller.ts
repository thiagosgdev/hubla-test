import { Body, Controller, HttpException, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { SignUpService } from './signUp.service';
import { SignUpRequestDTO } from 'src/shared/dtos/users/signUpRequest.dto';
import { UserWithTokenDTO } from 'src/shared/dtos/users/user.dto';

@ApiTags('users')
@Controller('/signup')
export class SignUpController {
  constructor(private signUpService: SignUpService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The user object will be returned',
    type: UserWithTokenDTO,
  })
  @ApiBadRequestResponse({
    description: 'This will be returned when a validation error happens',
  })
  @ApiConflictResponse({
    description: 'E-mail already in use!',
  })
  public async handle(@Body() data: SignUpRequestDTO) {
    try {
      return this.signUpService.execute(data);
    } catch (error) {
      throw new HttpException(
        error.response.message,
        error.response.statusCode,
      );
    }
  }
}
