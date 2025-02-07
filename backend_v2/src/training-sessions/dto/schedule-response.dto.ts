import { ExtendedTrainingSessionResponseDto } from './extended-training-session-response.dto';

export class ScheduleResponseDto {
  date: Date;
  data: ExtendedTrainingSessionResponseDto[];
}
