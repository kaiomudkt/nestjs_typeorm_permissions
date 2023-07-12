import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/api-access-modifiers.decorator';
import { Reflector } from '@nestjs/core';

/**
 * https://docs.nestjs.com/recipes/passport
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    console.log('jwt.auth.guard.ts constructor', reflector);
    super();
  }

  canActivate(context: ExecutionContext) {
    /** @SkipAuthou() */
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('jwt-auth.guard.ts isPublic ANTES', isPublic);
    if (isPublic) {
      return true;
    }
    console.log('jwt-auth.guard.ts isPublic DEPOIS', isPublic);
    return super.canActivate(context);
  }
}
