import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UserLogged } from '../base/interfaces/dto/user-logged.interface';
import { FindAllRolesByTenantDto } from './dto/find-all-roles.dto';
import { FindAllRolesPayloadRepository } from './domain/interfaces/repository/find-all-roles-by.repository.interface';

@Controller('api/v1/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Request() req, @Body() createRoleDto: CreateRoleDto) {
    const userLoggedReq: {
      id: string;
      status: string;
      name: string;
      email: string;
      tenantId: string;
    } = req.user;
    return this.roleService.create(createRoleDto, userLoggedReq);
  }

  @Get()
  findAll(@Request() req, @Query() query: FindAllRolesByTenantDto) {
    if (!req.user) {
      throw new UnauthorizedException('Usuário logado não informado');
    }
    const userLoggedReq: UserLogged = req.user;
    if (!userLoggedReq.tenantId) {
      throw new UnauthorizedException('Usuário logado não informado');
    }
    const tenantId: string = userLoggedReq.tenantId;
    const findAllData: FindAllRolesPayloadRepository = {
      tenantId: tenantId,
      page: query.page,
      limit: query.limit,
    };
    return this.roleService.findAll(findAllData);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
