import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create.dto';
import { ParamUuid } from 'src/infra/decorators/param-uuid.decorator';
import { UpdatePutUserDTO } from './dto/update-put.dto';
import { UpdatePatchUserDTO } from './dto/update-patch.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(':id')
  async show(@ParamUuid() id: string) {
    console.log({ id });
    return this.userService.show(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamUuid() id: string) {
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(
    @Body() data: UpdatePatchUserDTO,
    @ParamUuid() id: string,
  ) {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@ParamUuid() id: string) {
    return {
      success: await this.userService.delete(id),
    };
  }
}
