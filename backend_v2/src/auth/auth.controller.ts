import {
  Controller,
  Post,
  Body,
  Res,
  SerializeOptions,
  HttpCode,
  UseGuards,
  Get,
  // Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiTags } from '@nestjs/swagger';

import { SignInRequestDto } from './dto/sign-in/request.dto';
import { SignUpRequestDto } from './dto/sign-up/request.dto';
import { Response } from 'express';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { Roles } from './decorators/roles.decorator';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/user.decorator';

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
    @Body() data: SignInRequestDto,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.signIn(data);

    res.header('Authorization', `Bearer ${accessToken}`);
    res.header('Refresh', `Bearer ${refreshToken}`);
    return user;
  }

  @SerializeOptions({ type: UserResponseDto })
  @Post('/sign-up')
  async signUp(
    @Res({ passthrough: true }) res: Response<UserResponseDto>,
    @Body() data: SignUpRequestDto,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.signUp(data);

    res.header('Authorization', `Bearer ${accessToken}`);
    res.header('Refresh', `Bearer ${refreshToken}`);
    return user;
  }

  @SerializeOptions({ type: UserResponseDto })
  @Roles()
  @UseGuards(AuthGuard)
  @Get('/me')
  async me(@CurrentUser() userId: number) {
    return this.authService.me(userId);
  }

  @Roles()
  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@CurrentUser() userId: number) {
    await this.authService.logout(userId);
  }
}
