import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsDateString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegExHelper } from '../../../infra/utils/regex.helper';
import { MessagesHelper } from '../../../infra/utils/messages.helper';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  @MinLength(6)
  login: string;

  @IsString()
  @MinLength(6)
  @ApiProperty()
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  password: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  birthAt?: string;

  @IsOptional()
  @ApiProperty()
  tenantId?: string;
}
