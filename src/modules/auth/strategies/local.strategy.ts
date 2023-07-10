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
      usernameField: 'username' /** definindo username como campo do login */,
    });
  }

  async validate(username: string, password: string) {
    const userPayload = await this.authService.validateUser(username, password);
    if (!userPayload) {
      throw new UnauthorizedException('Login ou senha não encontrado');
    }
    return userPayload;
  }
}
