import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  SerializeOptions,
  Query,
  UseGuards,
  Post,
  HttpCode,
} from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchResponseDto } from './dto/branch-response.dto';
import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BranchesFilterDto } from './dto/branches-filter.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import {
  BaseUserResponseDto,
  UserResponseDto,
} from 'src/dto/user-response.dto';

@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @ApiResponse({
    status: 200,
    type: [BranchResponseDto],
    description:
      'Branches list with pagination, search & location-based sorting',
  })
  @SerializeOptions({ type: BranchResponseDto })
  @Get()
  async getMany(@Query() query: BranchesFilterDto) {
    return this.branchesService.getManyWithPaginationAndFilters(
      query.page,
      query.limit,
      query.latitude,
      query.longitude,
      query.search,
    );
  }

  @ApiResponse({
    status: 200,
    type: BranchResponseDto,
    description: 'Single branch by id',
  })
  @SerializeOptions({ type: BranchResponseDto })
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.branchesService.findOne(id);
  }

  @ApiBearerAuth('access-token')
  @Roles()
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    type: [UserResponseDto],
    description: 'Get branch binded users',
  })
  @SerializeOptions({ type: BaseUserResponseDto })
  @Get(':id/users')
  async getUsers(@Param('id', ParseIntPipe) id: number) {
    return this.branchesService.getBranchUsers(id);
  }

  @ApiResponse({
    status: 200,
    type: [UserResponseDto],
    description: 'Get branch staff',
  })
  @SerializeOptions({ type: BaseUserResponseDto })
  @Get(':id/staff')
  async getStaff(@Param('id', ParseIntPipe) id: number) {
    return this.branchesService.getBranchUsers(id, true);
  }

  @ApiBearerAuth('access-token')
  @Roles()
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Bind user to branch',
  })
  @HttpCode(200)
  @Post(':branchId/bind-user/:userId')
  async bind(
    @Param('branchId', ParseIntPipe) branchId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @CurrentUser() requestorId: number,
  ) {
    return this.branchesService.bindUser(branchId, userId, requestorId);
  }

  @ApiBearerAuth('access-token')
  @Roles()
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Unbind user from branch',
  })
  @HttpCode(200)
  @Post(':branchId/unbind-user/:userId')
  async unbind(
    @Param('branchId', ParseIntPipe) branchId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @CurrentUser() requestorId: number,
  ) {
    return this.branchesService.unbindUser(branchId, userId, requestorId);
  }
}
