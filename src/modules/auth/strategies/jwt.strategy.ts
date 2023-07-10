import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * responsabilidade de autorizar a partir de informações extraidas do header-authorization
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * o Passport primeiro verifica a assinatura do JWT e decodifica o JSON.
   * Em seguida, invoca o método validate()
   * passando o JSON decodificado como seu único parâmetro.
   * Com base na maneira como a assinatura do JWT funciona,
   * temos a garantia de receber um token válido que assinamos
   * e emitimos anteriormente para um usuário válido.
   * Lembre-se novamente de que o Passport criará um usero bjeto com base no valor de retorno de nosso validate() método
   * e o anexará como uma propriedade no Requestobjeto.
   * -
   * @UseGuards(LocalAuthGuard)
   * @Post('login')
   * async login(@Request() req) {
   *  return this.authService.login(req.user);
   * }
   */
  async validate(payload: any) {
    console.log('jwt.strategy.ts validate(payload)', payload);
    return {
      id: payload.sub,
      name: payload.userName,
      tenantId: payload.userTenantId,
      email: payload.userEmail,
      status: payload.userStatus,
    };
  }
}
