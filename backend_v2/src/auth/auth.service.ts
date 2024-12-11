import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';
import { SignInRequestDto } from './dto/sign-in/request.dto';
import { SignUpRequestDto } from './dto/sign-up/request.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateUser(data: SignInRequestDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          login: data.login,
        },
      });

      const passwordEquals = await bcrypt.compare(data.password, user.password);

      if (passwordEquals) return user;

      throw new UnauthorizedException('Invalid credentials');
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async generateToken(
    data: Partial<User>,
    type: 'access' | 'refresh',
  ): Promise<string> {
    const payload = { login: data.login, id: data.id, role: data.role };

    return this.jwtService.sign(
      { payload, type },
      {
        secret:
          type === 'access'
            ? process.env.JWT_ACCESS_TOKEN_SECRET_KEY
            : process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
        expiresIn:
          type === 'access'
            ? process.env.JWT_ACCESS_TOKEN_EXPIRATION
            : process.env.JWT_REFRESH_TOKEN_EXPIRATION,
      },
    );
  }

  async verifyToken(token: string, type: 'access' | 'refresh'): Promise<any> {
    try {
      return this.jwtService.verify(token, {
        secret:
          type === 'access'
            ? process.env.JWT_ACCESS_TOKEN_SECRET_KEY
            : process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async signIn(data: SignInRequestDto) {
    try {
      const user = await this.validateUser(data);

      const [accessToken, refreshToken] = await Promise.all([
        this.generateToken(user, 'access'),
        this.generateToken(user, 'refresh'),
      ]);

      const updatedUser = await this.prisma.user.update({
        where: {
          id: user.id,
        },

        data: {
          refreshToken,
        },
      });

      return {
        accessToken,
        refreshToken,
        user: updatedUser,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      this.logger.error(error);
      throw new BadRequestException();
    }
  }

  async signUp(data: SignUpRequestDto) {
    const candidate = await this.prisma.user.findUnique({
      where: {
        login: data.login,
      },
    });

    if (candidate) {
      throw new BadRequestException('User with such login already exists');
    }

    const hashPassword = await bcrypt.hash(data.password, 5);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashPassword,
      },
    });

    return this.generateToken(user, 'access');
  }

  async logout(userId: number): Promise<{ message: string }> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
    return { message: 'Logout successful' };
  }
}
