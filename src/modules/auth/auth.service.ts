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
      throw new UnauthorizedException();
    }
    return signAuthenticatedUserPayload;
  }

  async validateUser(username: string, password: string): Promise<any> {
    const options: FindOneOptions<UserSchemaTypeormImpl> = {
      where: { username },
    };
    const userSchema: UserSchemaTypeormImpl =
      await this.userRepositoryInstance.findOne(options);
    if (!userSchema) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = compareSync(password, userSchema.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const userPayload = {
      sub: userSchema.id,
      userName: userSchema.name,
      userEmail: userSchema.email,
      userStatus: userSchema.status,
    };
    return userPayload;
  }
}
