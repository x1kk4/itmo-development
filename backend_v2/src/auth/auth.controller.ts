import {
  Controller,
  Post,
  Body,
  Res,
  SerializeOptions,
  HttpCode,
  // Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiTags } from '@nestjs/swagger';

import { SignInRequestDto } from './dto/sign-in/request.dto';
import { SignUpRequestDto } from './dto/sign-up/request.dto';
import { Response } from 'express';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  // private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @SerializeOptions({ type: UserResponseDto })
  @HttpCode(200)
  @Post('/sign-in')
  async signIn(
    @Res({ passthrough: true }) res: Response<UserResponseDto>,
    @Body() userDto: SignInRequestDto,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.signIn(userDto);

    res.header('access', `Bearer ${accessToken}`);
    res.header('refresh', `Bearer ${refreshToken}`);
    return user;
  }

  @Post('/sign-up')
  signUp(@Body() userDto: SignUpRequestDto) {
    return this.authService.signUp(userDto);
  }
}
