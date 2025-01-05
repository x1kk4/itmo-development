import {
  Controller,
  Post,
  Body,
  Res,
  SerializeOptions,
  HttpCode,
  UseGuards,
  Get,
  Patch,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { SignInRequestDto } from './dto/sign-in/request.dto';
import { SignUpRequestDto } from './dto/sign-up/request.dto';
import { Response } from 'express';
import { Roles } from './decorators/roles.decorator';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/user.decorator';
import { EditProfileRequestDto } from './dto/edit/request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  BaseUserResponseDto,
  UserResponseDto,
} from 'src/dto/user-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 200,
    type: [UserResponseDto],
    description:
      'Sign in via login/email & password, get tokens with headers in response ',
    headers: {
      Authorization: {
        description:
          'Bearer токен для авторизации, обновляется любым приватным запросом по истечении и при наличии валидного Refresh токена',
        schema: {
          type: 'string',
          example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
      Refresh: {
        description: 'Bearer refresh токен',
        schema: {
          type: 'string',
          example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @SerializeOptions({ type: BaseUserResponseDto })
  @HttpCode(200)
  @Post('/sign-in')
  async signIn(
    @Res({ passthrough: true }) res: Response<BaseUserResponseDto>,
    @Body() data: SignInRequestDto,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.signIn(data);

    res.header('Authorization', `Bearer ${accessToken}`);
    res.header('Refresh', `Bearer ${refreshToken}`);
    return user;
  }

  @ApiResponse({
    status: 201,
    type: [UserResponseDto],
    description:
      'Create new user with login, email and password; get tokens via headers in response',
    headers: {
      Authorization: {
        description:
          'Bearer токен для авторизации, обновляется любым приватным запросом по истечении и при наличии валидного Refresh токена',
        schema: {
          type: 'string',
          example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
      Refresh: {
        description: 'Bearer refresh токен',
        schema: {
          type: 'string',
          example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @SerializeOptions({ type: BaseUserResponseDto })
  @Post('/sign-up')
  async signUp(
    @Res({ passthrough: true }) res: Response<BaseUserResponseDto>,
    @Body() data: SignUpRequestDto,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.signUp(data);

    res.header('Authorization', `Bearer ${accessToken}`);
    res.header('Refresh', `Bearer ${refreshToken}`);
    return user;
  }

  @ApiResponse({
    status: 200,
    type: [UserResponseDto],
    description: 'Get user data via Authorization header',
  })
  @ApiBearerAuth('access-token')
  @SerializeOptions({ type: BaseUserResponseDto })
  @Roles()
  @UseGuards(AuthGuard)
  @Get('/me')
  async me(@CurrentUser() userId: number) {
    return this.authService.me(userId);
  }

  @ApiResponse({
    status: 200,
    description: 'Edit profile via Authorization header',
  })
  @ApiBearerAuth('access-token')
  @Roles()
  @UseGuards(AuthGuard)
  @Patch('/edit-profile')
  async editProfile(
    @CurrentUser() userId: number,
    @Body()
    data: EditProfileRequestDto,
  ) {
    await this.authService.editProfile(userId, data);
  }

  @ApiResponse({
    status: 200,
    description: 'Edit profile picture via Authorization header',
  })
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description:
            'Image file (max 10MB, formats: JPEG, PNG, GIF, HEIC, WEBP)',
        },
      },
    },
  })
  @Roles()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
      fileFilter: (req, file, callback) => {
        if (
          !file.mimetype.match(/^image\/(jpeg|png|gif|jpg|heic|heif|webp)$/)
        ) {
          return callback(
            new BadRequestException(
              'Supported formats: JPEG, PNG, GIF, HEIC, WEBP',
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  @Patch('/edit-avatar')
  async editAvatar(
    @CurrentUser() userId: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|gif|heic|heif|webp)$/i,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.authService.editAvatar(userId, file);
  }

  @ApiResponse({
    status: 200,
    description: 'Logout session via Authorization header',
  })
  @HttpCode(200)
  @Roles()
  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@CurrentUser() userId: number) {
    await this.authService.logout(userId);
  }
}
