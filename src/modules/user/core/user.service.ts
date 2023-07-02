import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePatchUserDTO } from './dto/update-patch.dto';
import { UpdatePutUserDTO } from './dto/update-put.dto';
import { CreateUserDTO } from './dto/create.dto';
import * as bcrypt from 'bcrypt';
import { isValid } from 'date-fns';
import { UserDomain } from './user.domain';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDTO) {
    const userDomain = new UserDomain(data);
    userDomain.validBirth();
    if (
      await this.usersRepository.exist({
        where: {
          email: data.email,
        },
      })
    ) {
      throw new BadRequestException('Este e-mail já está sendo usado.');
    }

    const salt = await bcrypt.genSalt();

    data.password = await bcrypt.hash(data.password, salt);

    const user = this.usersRepository.create(data);

    return this.usersRepository.save(user);
  }

  async list() {
    return this.usersRepository.find();
  }

  async show(id: string) {
    await this.exists(id);
    return this.usersRepository.findOneBy({
      id,
    });
  }

  async update(
    id: string,
    { email, name, password, birthAt }: UpdatePutUserDTO,
  ) {
    await this.exists(id);
    const salt = await bcrypt.genSalt();
    if (birthAt && !isValid(new Date(birthAt))) {
      throw new Error('A data de nascimento é inválida.');
    }
    password = await bcrypt.hash(password, salt);
    await this.usersRepository.update(id, {
      email,
      name,
      password,
      birthAt,
    });

    return this.show(id);
  }

  async updatePartial(
    id: string,
    { email, name, password, birthAt }: UpdatePatchUserDTO,
  ) {
    await this.exists(id);
    const data: any = {};
    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }
    if (email) {
      data.email = email;
    }
    if (name) {
      data.name = name;
    }
    if (password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);
    }
    await this.usersRepository.update(id, data);
    return this.show(id);
  }

  async delete(id: string) {
    await this.exists(id);
    await this.usersRepository.delete(id);
    return true;
  }

  async exists(id: string) {
    if (
      !(await this.usersRepository.exist({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O usuário ${id} não existe.`);
    }
  }
}
