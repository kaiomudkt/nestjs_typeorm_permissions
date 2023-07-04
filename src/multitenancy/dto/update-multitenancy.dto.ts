import { PartialType } from '@nestjs/swagger';
import { CreateMultitenancyDto } from './create-multitenancy.dto';

export class UpdateMultitenancyDto extends PartialType(CreateMultitenancyDto) {}
