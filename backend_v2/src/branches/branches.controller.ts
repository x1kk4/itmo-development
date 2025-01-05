import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  SerializeOptions,
  Query,
} from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchResponseDto } from './dto/branch-response.dto';
import { PaginationDto } from 'src/dto/pagination.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  // @Post()
  // create(@Body() createBranchDto: CreateBranchDto) {
  //   return this.branchesService.create(createBranchDto);
  // }

  @ApiResponse({
    status: 200,
    type: [BranchResponseDto],
    description: 'Branches list with pagination',
  })
  @SerializeOptions({ type: BranchResponseDto })
  @Get()
  async getMany(@Query() query: PaginationDto) {
    return this.branchesService.getManyWithPaginationAndFilters(
      query.page,
      query.limit,
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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
  //   return this.branchesService.update(+id, updateBranchDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.branchesService.remove(+id);
  // }
}
