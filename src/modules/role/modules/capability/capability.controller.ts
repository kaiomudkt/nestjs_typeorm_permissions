import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CapabilityService } from './capability.service';
import { CreateCapabilityDto } from './dto/create-capability.dto';
import { UpdateCapabilityDto } from './dto/update-capability.dto';

@Controller('capability')
export class CapabilityController {
  constructor(private readonly capabilityService: CapabilityService) {}

  @Post()
  create(@Body() createCapabilityDto: CreateCapabilityDto) {
    return this.capabilityService.create(createCapabilityDto);
  }

  @Get()
  findAll() {
    return this.capabilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.capabilityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCapabilityDto: UpdateCapabilityDto) {
    return this.capabilityService.update(+id, updateCapabilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.capabilityService.remove(+id);
  }
}
