import {
  Controller,
  Get,
  Param,
  SerializeOptions,
  ParseIntPipe,
  Query,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UserResponseDto,
  BaseUserResponseDto,
} from 'src/dto/user-response.dto';
import { PaginationDto } from 'src/dto/pagination.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    type: [UserResponseDto],
    description: 'Users list with pagination & search filter',
  })
  @SerializeOptions({ type: BaseUserResponseDto })
  @Get()
  async getMany(@Query() query: PaginationDto) {
    return this.usersService.getManyWithPaginationAndFilters(
      query.page,
      query.limit,
      query.search,
    );
  }

  @ApiResponse({
    status: 200,
    type: UserResponseDto,
    description: 'Single user by id',
  })
  @SerializeOptions({ type: BaseUserResponseDto })
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiResponse({
    description:
      'Create invitation code for CHILDREN. Endpoint can be called by an authorized user with any role other than CHILDREN.',
  })
  @ApiBearerAuth('access-token')
  @Roles(Role.SUPER, Role.MANAGER, Role.COACH, Role.PARENT)
  @UseGuards(AuthGuard)
  @Post('invite-children')
  async inviteChildren(@CurrentUser() userId: number) {
    return this.usersService.inviteChildren(userId);
  }

  @ApiResponse({
    description:
      'Create invitation code for COACH. Endpoint can be called by an authorized user with SUPER or MANAGER roles.',
  })
  @ApiBearerAuth('access-token')
  @Roles(Role.SUPER, Role.MANAGER)
  @UseGuards(AuthGuard)
  @Post('invite-coach')
  async inviteCoach() {
    return this.usersService.inviteCoach();
  }

  @ApiResponse({
    description:
      'Create invitation code for MANAGER. Endpoint can be called by an authorized user with SUPER role.',
  })
  @ApiBearerAuth('access-token')
  @Roles(Role.SUPER)
  @UseGuards(AuthGuard)
  @Post('invite-manager')
  async inviteManager() {
    return this.usersService.inviteManager();
  }
}
