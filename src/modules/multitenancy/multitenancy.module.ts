import { Global, Module } from '@nestjs/common';
import { MultitenancyService } from './multitenancy.service';
import { MultitenancyController } from './multitenancy.controller';
import { MultitenancyGuard } from './multitenancy.guard';

@Global()
@Module({
  controllers: [MultitenancyController],
  providers: [MultitenancyService, MultitenancyGuard],
})
export class MultitenancyModule {}
