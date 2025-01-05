import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MinioService } from './minio/minio.service';
import { BranchesModule } from './branches/branches.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    BranchesModule,
  ],
  controllers: [],
  providers: [MinioService],
})
export class AppModule {}
