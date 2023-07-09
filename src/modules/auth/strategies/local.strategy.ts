import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// TODO: import { MessagesHelper } from 'src/helpers/messages.helper';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email' /** definindo email como campo do username */,
    });
  }

  async validate(email: string, password: string) {
    // const userEntity = await this.authService.validateUser(email, password);
    // if (!userEntity) {
    // // TODO:   throw new UnauthorizedException(MessagesHelper.PASSWORD_OR_EMAIL_INVALID);
    // }
    // return userEntity;
  }
}
