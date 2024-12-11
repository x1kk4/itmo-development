import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
