import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MultitenancyService } from './multitenancy.service';

@Injectable()
export class MultitenancyGuard implements CanActivate {
  constructor(private tenantService: MultitenancyService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const subdomain = request.user.subdomain;
    this.tenantService.subdomain = subdomain;
    // TODO: faz validações que precisar e lança exceção
    return true;
  }
}
