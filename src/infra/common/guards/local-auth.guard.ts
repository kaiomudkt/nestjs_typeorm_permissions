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
    });
  }

  async validate(request: Request, username: string, password: string) {
    console.log('local-auth.guards.ts validate()');
    const contextId = ContextIdFactory.getByRequest(request);
    // "AuthService" is a request-scoped provider
    const authService = await this.moduleRef.resolve(AuthService, contextId);
  }
}
