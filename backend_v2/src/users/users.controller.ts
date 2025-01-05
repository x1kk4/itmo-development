import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  Param,
  // Delete,
  SerializeOptions,
  // UseGuards,
  ParseIntPipe,
  Query,
  // DefaultValuePipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UserResponseDto,
  BaseUserResponseDto,
} from 'src/dto/user-response.dto';
import { PaginationDto } from 'src/dto/pagination.dto';
import { ApiResponse } from '@nestjs/swagger';
// import { AuthGuard } from 'src/auth/guards/auth.guard';
// import {
// ApiBearerAuth,
// ApiTags
// ApiQuery,
// } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // async create(@Body() createUserDto: any) {
  //   return this.usersService.create(createUserDto);
  // }

  @ApiResponse({
    status: 200,
    type: [UserResponseDto],
    description: 'Users list with pagination',
  })
  @SerializeOptions({ type: BaseUserResponseDto })
  @Get()
  async getMany(@Query() query: PaginationDto) {
    return this.usersService.getManyWithPaginationAndFilters(
      query.page,
      query.limit,
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

  // @Patch(':id')
  // async update(@Param() id: string, @Body() updateUserDto: any) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Patch('/ban/:id')
  // ban
}
