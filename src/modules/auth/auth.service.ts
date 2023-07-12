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

  async login(userPayload: any) {
    const signAuthenticatedUserPayload = {
      access_token: await this.jwtService.signAsync(userPayload),
    };
    if (!signAuthenticatedUserPayload) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    return signAuthenticatedUserPayload;
  }

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
    const userPayload = {
      sub: userSchema.id,
      userName: userSchema.name,
      userTenantId: userSchema.tenant ? userSchema.tenant.id : null,
      userEmail: userSchema.email,
      userStatus: userSchema.status,
    };
    if (!userPayload.userTenantId) {
      throw new UnauthorizedException(
        'Usuário logado não tem tenant para acessar',
      );
    }
    return userPayload;
  }
}
