import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePartialUserDto } from './dto/update-partial-user.dto';
import { FindAllUsersByTenantDto } from './dto/find-all-users-by-tenant.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  Permission,
  USER_CAPABILITIES,
} from '../../infra/common/decorators/permission.decorator';

@Controller('api/v1/user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(@Request() req) {
    if (!req.user) {
      throw new UnauthorizedException('Usuário logado não informado');
    }
    // console.log('user/profile: req.user', req.user);
    return req.user;
  }

  @Post()
  create(@Request() req, @Body() createUserDto: CreateUserDto) {
    // TODO: tenantId do user logado
    if (!req.user) {
      throw new UnauthorizedException('Usuário logado não informado');
    }
    const userLoggedReq: {
      id: string;
      status: string;
      name: string;
      email: string;
      tenantId: string;
    } = req.user;
    return this.userService.create(createUserDto, userLoggedReq);
  }

  @Get()
  findAll(@Request() req, @Query() query: FindAllUsersByTenantDto) {
    if (!req.user) {
      throw new UnauthorizedException('Usuário logado não informado');
    }
    const userLoggedReq: {
      id: string;
      status: string;
      name: string;
      email: string;
      tenantId: string;
    } = req.user;
    console.log('userLoggedReq', userLoggedReq);
    const tenantId: string = userLoggedReq.tenantId;
    const { page, limit } = query;
    return this.userService.findAll(tenantId, page, limit);
  }

  @Permission([USER_CAPABILITIES.user_findOne])
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    if (!req.user) {
      throw new UnauthorizedException('Usuário logado não informado');
    }
    const userLoggedReq: {
      id: string;
      status: string;
      name: string;
      email: string;
      tenantId: string;
    } = req.user;
    console.log('findOne userLoggedReq', userLoggedReq);
    return this.userService.findOne(id, userLoggedReq);
  }

  @Patch(':id')
  updatePartial(
    @Param('id') id: string,
    @Body() updatePartialUserDto: UpdatePartialUserDto,
  ) {
    return this.userService.updatePartial(id, updatePartialUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
