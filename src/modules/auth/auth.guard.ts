// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';
// // import { IS_PUBLIC_KEY } from '../../infra/common/decorators/api-access-modifiers.decorator';
// export const IS_PUBLIC_KEY = 'isPublic';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService, private reflector: Reflector) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (isPublic) {
//       // api-access-modifiers.decorator
//       return true;
//     }
//     const request = context.switchToHttp().getRequest();
//     const token = this.extractTokenFromHeader(request);
//     if (!token) {
//       throw new UnauthorizedException();
//     }
//     try {
//       const payload = await this.jwtService.verifyAsync(token, {
//         secret: process.env.JWT_SECRET,
//       });
//       // Estamos atribuindo o payload ao objeto request aqui
//       // para que possamos acessá-lo em nossos manipuladores de rota
//       request['user'] = payload;
//     } catch {
//       throw new UnauthorizedException();
//     }
//     return true;
//   }

//   // Implemente a lógica para extrair o token do cabeçalho da requisição
//   // Por exemplo, se o token estiver no cabeçalho "Authorization: Bearer <token>"
//   private extractTokenFromHeader(request: Request): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
// }
