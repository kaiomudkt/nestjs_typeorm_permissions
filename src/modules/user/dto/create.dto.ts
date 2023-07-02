import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsDateString,
  IsEnum,
} from 'class-validator';
//   import { Role } from '../../enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  birthAt?: string;

}
