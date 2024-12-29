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
// import { AuthGuard } from 'src/auth/guards/auth.guard';
// import {
// ApiBearerAuth,
// ApiTags
// ApiQuery,
// } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersRequestDto } from './dto/get-users/request.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // async create(@Body() createUserDto: any) {
  //   return this.usersService.create(createUserDto);
  // }

  // @ApiBearerAuth('access-token')
  // @UseGuards(AuthGuard)
  @SerializeOptions({ type: UserResponseDto })
  @Get()
  async getMany(@Query() query: UsersRequestDto) {
    return this.usersService.getManyWithPaginationAndFilters(
      query.page,
      query.limit,
    );
  }

  @SerializeOptions({ type: UserResponseDto })
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
