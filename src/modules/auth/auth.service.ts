import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserSchemaTypeormImpl } from '../user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserSchemaTypeormImpl)
    private readonly userRepositoryInstance: Repository<UserSchemaTypeormImpl>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * AUTORIZAÇÃO
   * src/modules/auth/auth.controller.ts
   * neste momento o @UseGuards(LocalAuthGuard) já autenticou quem é o usuário;
   * agora precisamos autorizar/assinar o token;
   */
  async login(userPayload: UserPayload) {
    const signAuthenticatedUserPayload = {
      access_token: await this.jwtService.signAsync(userPayload),
    };
    if (!signAuthenticatedUserPayload) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    return signAuthenticatedUserPayload;
  }

  /**
   * AUTENTICAÇÃO
   * src/modules/auth/strategies/local.strategy.ts
   */
  async validateUser(username: string, password: string): Promise<any> {
    const options: FindOneOptions<UserSchemaTypeormImpl> = {
      where: { username },
      relations: ['tenant'],
    };
    const userSchema: UserSchemaTypeormImpl =
      await this.userRepositoryInstance.findOne(options);
    if (!userSchema || !userSchema.id) {
      throw new UnauthorizedException('Login ou senha não encontrado');
    }
    const isPasswordValid = compareSync(password, userSchema.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Login ou senha não encontrado');
    }
    const userPayload: UserPayload = {
      sub: userSchema.id,
      userName: userSchema.name,
      userTenantId: userSchema.tenant ? userSchema.tenant.id : null,
      userEmail: userSchema.email,
      userStatus: userSchema.status,
    };
    if (!userPayload.userTenantId) {
      throw new UnauthorizedException(
        'Usuário logado não tem tenant para acessar.',
      );
    }
    if (!userPayload.userStatus) {
      throw new UnauthorizedException(
        'O usuário logado não tem um status válido.',
      );
    }
    return userPayload;
  }
}

export type UserPayload = {
  sub: string;
  userStatus: string;
  userName: string;
  userEmail: string;
  userTenantId: string;
  iat?: number;
  exp?: number;
};
