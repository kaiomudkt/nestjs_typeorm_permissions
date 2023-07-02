import { Module } from '@nestjs/common';
import { BancoDoBrasilController } from './banco-do-brasil.controller';
import { BancoDoBrasilService } from './banco-do-brasil.service';

@Module({
  controllers: [BancoDoBrasilController],
  providers: [BancoDoBrasilService]
})
export class BancoDoBrasilModule {}
