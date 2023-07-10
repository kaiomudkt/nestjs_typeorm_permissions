import { IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegExHelper } from '../../../infra/utils/regex.helper';
import { MessagesHelper } from '../../../infra/utils/messages.helper';

export class SignInDto {
  @IsString()
  @ApiProperty()
  @MinLength(6)
  username: string;

  @IsString()
  @MinLength(6)
  @ApiProperty()
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  password: string;
}
