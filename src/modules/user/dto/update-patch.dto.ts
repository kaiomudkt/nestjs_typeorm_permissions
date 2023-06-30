import { CreateUserDTO } from './create.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePatchUserDTO extends PartialType(CreateUserDTO) {}
