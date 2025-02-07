import { TrainingSessionResponseDto } from './training-session-response.dto';
import { UserResponseDto } from 'src/dto/user-response.dto';
import { BranchResponseDto } from 'src/branches/dto/branch-response.dto';

export class ExtendedTrainingSessionResponseDto extends TrainingSessionResponseDto {
  enrolled: any;
  attendees: any;
  coach: UserResponseDto;
  branch: BranchResponseDto;
}
