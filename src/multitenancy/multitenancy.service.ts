import { Injectable } from '@nestjs/common';
import { CreateMultitenancyDto } from './dto/create-multitenancy.dto';
import { UpdateMultitenancyDto } from './dto/update-multitenancy.dto';

@Injectable()
export class MultitenancyService {
  create(createMultitenancyDto: CreateMultitenancyDto) {
    return 'This action adds a new multitenancy';
  }

  findAll() {
    return `This action returns all multitenancy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} multitenancy`;
  }

  update(id: number, updateMultitenancyDto: UpdateMultitenancyDto) {
    return `This action updates a #${id} multitenancy`;
  }

  remove(id: number) {
    return `This action removes a #${id} multitenancy`;
  }
}
