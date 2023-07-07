import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePartialUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @ApiProperty()
  status?: string;

  // @ApiProperty({ required: false })
  tenantId?: never;
}
