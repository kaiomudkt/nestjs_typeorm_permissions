import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * o rotulo @UseGuards(AuthGuard('local'))
   * chama src/auth/strategies/local.strategy.ts function async validate(email: string, password: string)
   * AuthGuard retorna @Req() req.user por padrão do Passport
   */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() body) {
    return await this.authService.login(body.username, body.password);
  }
}
