import { Module } from '@nestjs/common';
import { CapabilityService } from './capability.service';
import { CapabilityController } from './capability.controller';

@Module({
  controllers: [CapabilityController],
  providers: [CapabilityService]
})
export class CapabilityModule {}
