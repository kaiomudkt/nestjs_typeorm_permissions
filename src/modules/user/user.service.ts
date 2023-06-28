import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
//   constructor(
//     @InjectRepository(UserEntity)
//     private readonly userRepository: Repository<UserEntity>,
//   ) {}

//   async create(data: createDto) {
//     return;
//   }

//   async list() {}

//   async show(id: string) {}

//   async update(id: string, updateDto) {}

//   async updatePartial(id: string, updatePartialDto) {}

//   async delete(id: string) {}

//   async exists(id: string) {}
}
