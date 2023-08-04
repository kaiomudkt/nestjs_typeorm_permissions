import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @IsString()
  @ApiProperty()
  idCode?: string;

  @IsString()
  @ApiProperty()
  label: string;

  @IsString()
  @ApiProperty()
  createdById: string;

  @IsString()
  @ApiProperty()
  icon?: string;

  @IsString()
  @ApiProperty()
  color?: string;

  @IsString()
  @ApiProperty()
  description?: string;

  @IsString()
  @ApiProperty()
  status?: string;
}
