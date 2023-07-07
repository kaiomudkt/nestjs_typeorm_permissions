import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { FindAllUsersByTenantDto } from './dto/find-all-users-by-tenant.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: FindAllUsersByTenantDto) {
    const tenantId = 'tenant_1'; // TODO: extrair o tenantId do auth guard
    const { page, limit } = query;
    console.log('query: ', query);
    return this.userService.findAll(tenantId, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('zzzzzzzzzzzzzz: ');
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePatchUserDto: UpdatePatchUserDto,
  ) {
    return this.userService.update(+id, updatePatchUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
