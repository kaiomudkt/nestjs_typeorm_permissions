import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
// TODO: import { MessagesHelper } from 'src/helpers/messages.helper';

/**
 * LocalStrategy responsabilidade de verificar autenticar por login e senha
 * https://docs.nestjs.com/recipes/passport
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      passReqToCallback: true,
      usernameField: 'username' /** definindo username como campo do login */,
      passwordField: 'password',
    });
  }

  async validate(request: Request, username: string, password: string) {
    console.log('local-strategy.ts validate() request: ', request.body);
    console.log('local-strategy.ts validate123()', username);
    console.log('local-strategy.ts validate345()', password);
    const userPayload = await this.authService.validateUser(username, password);
    if (!userPayload) {
      throw new UnauthorizedException('Login ou senha não encontrado');
    }
    return userPayload;
  }
}
