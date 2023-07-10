import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { NAME_DECORATOR } from '../decorators/permission.decorator';
import { UserSchemaTypeormImpl } from '../../../modules/user/repository/typeorm/implementation/schema/user.schema.typeorm.impl';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/**
 * ter 'permissão' diz respeito
 * se o usuário logado que esta tentando executar está ação
 * tem algum 'cargo' que tenha a ou as 'capacidades' que a ação exige
 * -
 * A verificação se o 'usuário/user' logado possui um 'cago/role' que tem a 'permissão/permission'
 * de executar a ação que pode ser um service, controler ou outro que tiver este guard @permission
 * -
 * lembrando que existe outro 'guard' com a responsabilidade de veriricar se o usuário logado
 * tem acesso ao tenant que esta solicitando (this user logged has access to this tenancy)
 */
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    @InjectRepository(UserSchemaTypeormImpl)
    private readonly userRepositoryInstance: Repository<UserSchemaTypeormImpl>,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let hasPermission = false;
    const requiredCapabilities: string[] = this.reflector.get(
      NAME_DECORATOR,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      throw new UnauthorizedException('Precisa ter um usuário logado.');
    }
    const userLogged = request.user;
    if (!request.id) {
      throw new UnauthorizedException('Precisa ter um usuário logado.');
    }
    // TODO: implementar validação que usuário logado tem as 'capacidades' que são exigidas nesta ação
    const userRoles = userLogged.roles;
    // const permissions = this.RoleRepositoryInstance.findPermissionsByRoles(userRoles);
    // const hasCapability: boolean = this.hasCapability(requiredCapabilities, permissions);
    // if (hasCapability) {
    hasPermission = true;
    // }
    return hasPermission;
  }

  private hasCapability(requiredCapabilities: string[], b): boolean {
    return true;
  }
}
