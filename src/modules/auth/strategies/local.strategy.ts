import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// TODO: import { MessagesHelper } from 'src/helpers/messages.helper';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username' /** definindo username como campo do login */,
    });
  }

  async validate(email: string, password: string) {
    console.log('local.strategy.ts validate()');
    const userSchema = await this.authService.validateUser(email, password);
    if (!userSchema) {
      // TODO:   throw new UnauthorizedException(MessagesHelper.PASSWORD_OR_EMAIL_INVALID);
      return null;
    }
    return userSchema;
  }
}
