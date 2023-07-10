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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePartialUserDto } from './dto/update-partial-user.dto';
import { FindAllUsersByTenantDto } from './dto/find-all-users-by-tenant.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/v1/user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Request() req, @Query() query: FindAllUsersByTenantDto) {
    const user: {
      id: string;
      status: string;
      name: string;
      email: string;
      tenantId: string;
    } = req.user;
    const tenantId: string = user.tenantId;
    const { page, limit } = query;
    return this.userService.findAll(tenantId, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
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
