import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  Param,
  // Delete,
  SerializeOptions,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  ApiBearerAuth,
  // ApiTags
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // async create(@Body() createUserDto: any) {
  //   return this.usersService.create(createUserDto);
  // }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @SerializeOptions({ type: UserResponseDto })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // @Patch(':id')
  // async update(@Param() id: string, @Body() updateUserDto: any) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Patch('/ban/:id')
  // ban
}
