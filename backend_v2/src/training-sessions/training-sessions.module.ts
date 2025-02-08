import { Module } from '@nestjs/common';

import { TrainingSessionsController } from './training-sessions.controller';
import { TrainingSessionsService } from './training-sessions.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TrainingSessionsController],
  providers: [TrainingSessionsService],
  imports: [AuthModule],
})
export class TrainingSessionsModule {}
