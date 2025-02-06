import { TrainingSessionResponseDto } from './training-session-response.dto';

export class ScheduleResponseDto {
  date: Date;
  data: TrainingSessionResponseDto[];
}
