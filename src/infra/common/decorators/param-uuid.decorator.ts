import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { validate } from 'uuid';

export const ParamUuid = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const id = String(context.switchToHttp().getRequest().params.id);
    if (!validate(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    return id;
  },
);
