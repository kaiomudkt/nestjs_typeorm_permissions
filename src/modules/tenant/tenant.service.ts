import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantSchemaTypeormImpl } from './repository/typeorm/tenant.schema.typeorm.impl';
import { Repository } from 'typeorm';
import { CreateTenantUsecase } from './domain/usecase/create-tenant.usecase';
import { CreateTenantTypeormRepoImpl } from './repository/typeorm/implementation/create-tenanty.typeorm.repo.impl';

@Injectable()
export class TenantService {
  private createTenantUsecase: CreateTenantUsecase;

  constructor(
    @InjectRepository(TenantSchemaTypeormImpl)
    private readonly tenantRepositoryInstance: Repository<TenantSchemaTypeormImpl>,
  ) {
    this.createTenantUsecase = new CreateTenantUsecase(
      new CreateTenantTypeormRepoImpl(this.tenantRepositoryInstance),
    );
  }

  async create(createTenantDto: CreateTenantDto) {
    const data: any = await this.createTenantUsecase.create({
      ...createTenantDto,
      // tenant: this.tenantService.tenant,
    });
    // envio de email
    return data;
  }

  findAll() {
    return `This action returns all tenant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
