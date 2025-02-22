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
import { BranchResponseDto } from 'src/branches/dto/branch-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('access-token')
  @Roles()
  @UseGuards(AuthGuard)
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

  @ApiBearerAuth('access-token')
  @Roles()
  @UseGuards(AuthGuard)
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

  @ApiBearerAuth('access-token')
  @Roles()
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    type: [UserResponseDto],
    description: "User's children by user id",
  })
  @SerializeOptions({ type: BaseUserResponseDto })
  @Get(':id/children')
  async getChildrenList(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getChildren(id);
  }

  @ApiBearerAuth('access-token')
  @Roles()
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    type: [UserResponseDto],
    description: "User's parents by user id",
  })
  @SerializeOptions({ type: BaseUserResponseDto })
  @Get(':id/parents')
  async getParents(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getParents(id);
  }

  @ApiBearerAuth('access-token')
  @Roles()
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    type: [BranchResponseDto],
    description: "User's branches by user id",
  })
  @SerializeOptions({ type: BranchResponseDto })
  @Get(':id/branches')
  async getBranches(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getBranches(id);
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
