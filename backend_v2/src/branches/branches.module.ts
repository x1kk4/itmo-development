import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BranchesController],
  providers: [BranchesService],
  imports: [AuthModule],
})
export class BranchesModule {}
