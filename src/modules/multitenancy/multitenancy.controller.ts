import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MultitenancyService } from './multitenancy.service';
import { CreateMultitenancyDto } from './dto/create-multitenancy.dto';
import { UpdateMultitenancyDto } from './dto/update-multitenancy.dto';

@Controller('multitenancy')
export class MultitenancyController {
  constructor(private readonly multitenancyService: MultitenancyService) {}

  @Post()
  create(@Body() createMultitenancyDto: CreateMultitenancyDto) {
    return this.multitenancyService.create(createMultitenancyDto);
  }

  @Get()
  findAll() {
    return this.multitenancyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.multitenancyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMultitenancyDto: UpdateMultitenancyDto) {
    return this.multitenancyService.update(+id, updateMultitenancyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.multitenancyService.remove(+id);
  }
}
