import { Module } from '@nestjs/common';
import { MultitenancyService } from './multitenancy.service';
import { MultitenancyController } from './multitenancy.controller';

@Module({
  controllers: [MultitenancyController],
  providers: [MultitenancyService]
})
export class MultitenancyModule {}
