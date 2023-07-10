import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthGuard } from './auth.guard';
// import { SkipAuthou } from '../../infra/common/decorators/api-access-modifiers.decorator';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../../infra/common/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * o rotulo @UseGuards(LocalAuthGuard)
   * chama src/auth/strategies/local.strategy.ts function async validate(email: string, password: string)
   * AuthGuard retorna @Req() req.user por padrão do Passport
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @HttpCode(HttpStatus.OK)
  // @SkipAuthou()
  // @Post('login')
  // signIn(@Body() signInDto: Record<string, any>) {
  //   return this.authService.signIn(signInDto.username, signInDto.password);
  // }
}
