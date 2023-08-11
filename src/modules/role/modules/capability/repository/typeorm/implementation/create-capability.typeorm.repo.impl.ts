import { Injectable } from '@nestjs/common';
import { CapabilitySchemaTypeormImpl } from '../capability.schema.typeorm.impl';
import { TenantSchemaTypeormImpl } from '../../../../../../tenant/repository/typeorm/tenant.schema.typeorm.impl';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { ICreateCapabilityRepository } from '../../../domain/interfaces/repositories/create-capability.repository.interface';

@Injectable()
export class CreateCapabilityTypeormRepoImpl
  implements
    ICreateCapabilityRepository<
      CapabilitySchemaTypeormImpl,
      TenantSchemaTypeormImpl
    >
{
  constructor(
    @InjectRepository(CapabilitySchemaTypeormImpl)
    private readonly CapabilityRepository: Repository<CapabilitySchemaTypeormImpl>,
    @InjectRepository(TenantSchemaTypeormImpl)
    private readonly tenantRepository: Repository<TenantSchemaTypeormImpl>,
  ) {}

  async create(
    schema: CapabilitySchemaTypeormImpl,
  ): Promise<CapabilitySchemaTypeormImpl> {
    const createdUser: CapabilitySchemaTypeormImpl =
      await this.CapabilityRepository.save(schema);
    return createdUser;
  }

  async findTenantById(
    tenantId: string,
  ): Promise<TenantSchemaTypeormImpl | undefined> {
    const options: FindOneOptions<TenantSchemaTypeormImpl> = {
      where: { id: tenantId },
    };
    const tenantSchema = await this.tenantRepository.findOne(options);
    return tenantSchema;
  }

  async findCapabilitySchemaById(
    capabilityId: string,
  ): Promise<CapabilitySchemaTypeormImpl | undefined> {
    const options: FindOneOptions<CapabilitySchemaTypeormImpl> = {
      where: { id: capabilityId },
    };
    const userSchema: CapabilitySchemaTypeormImpl =
      await this.CapabilityRepository.findOne(options);
    return userSchema;
  }
}
