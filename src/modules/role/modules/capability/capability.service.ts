import { Injectable } from '@nestjs/common';
import { CreateCapabilityDto } from './dto/create-capability.dto';
import { UpdateCapabilityDto } from './dto/update-capability.dto';

@Injectable()
export class CapabilityService {
  create(createCapabilityDto: CreateCapabilityDto) {
    return 'This action adds a new capability';
  }

  findAll() {
    return `This action returns all capability`;
  }

  findOne(id: number) {
    return `This action returns a #${id} capability`;
  }

  update(id: number, updateCapabilityDto: UpdateCapabilityDto) {
    return `This action updates a #${id} capability`;
  }

  remove(id: number) {
    return `This action removes a #${id} capability`;
  }
}
