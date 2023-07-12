import { Injectable } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../../modules/auth/auth.service';

/**
 * https://docs.nestjs.com/recipes/passport
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
      usernameField: 'username',
      passwordField: 'password',
    });
    console.log('LocalAuthGuard');
  }

  async validate(request: Request, username: string, password: string) {
    console.log('local-auth.guards.ts validate()', request);
    console.log('local-auth.guards.ts validate()', username);
    console.log('local-auth.guards.ts validate()', password);
    const contextId = ContextIdFactory.getByRequest(request);
    // "AuthService" is a request-scoped provider
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    console.log('LocalAuthGuard validate authService', authService);
    return request.body;
  }
}
