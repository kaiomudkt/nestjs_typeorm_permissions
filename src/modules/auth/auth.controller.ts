import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../../infra/common/guards/local-auth.guard';
import { SkipAuthou } from '../../infra/common/decorators/api-access-modifiers.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * o rotulo @UseGuards(LocalAuthGuard)
   * chama src/auth/strategies/local.strategy.ts function async validate(email: string, password: string)
   * AuthGuard retorna @Req() req.user por padrão do Passport
   */
  @SkipAuthou() // skip JwtAuthGuard, mas nao LocalAuthGuard
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
