import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { MinioService } from 'src/minio/minio.service';

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [AuthService, MinioService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
