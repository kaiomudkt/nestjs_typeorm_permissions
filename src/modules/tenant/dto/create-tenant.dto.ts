import { IsString, IsEmail, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  status?: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  foundationDateAt?: Date;

  @IsOptional()
  @ApiProperty()
  superAdminId?: string;

  @IsOptional()
  @ApiProperty()
  createdById: string;
}
