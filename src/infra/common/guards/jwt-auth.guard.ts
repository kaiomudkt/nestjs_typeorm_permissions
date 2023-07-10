import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * https://docs.nestjs.com/recipes/passport
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
