import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsDateString,
  Matches,
} from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { RegExHelper } from '../../../infra/utils/regex.helper';
import { MessagesHelper } from '../../../infra/utils/messages.helper';
import { Exclude } from 'class-transformer';

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
  username: string;

  @IsString()
  @MinLength(6)
  @ApiProperty()
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  password: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  birthAt?: string;

  @Exclude()
  @ApiHideProperty()
  tenantId?: never;

  @Exclude()
  @ApiHideProperty()
  createdById?: never;

  @Exclude()
  @ApiHideProperty()
  createdAt?: never;
}
