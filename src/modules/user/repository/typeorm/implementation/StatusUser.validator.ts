import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { StatusUserEnum } from '../../../domain/enum/status-user.enum';
import { toEnum } from '../../../../../infra/utils/enum/enum-operations';

@Injectable()
@ValidatorConstraint({ name: 'statusUser', async: false })
export class StatusUserValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    const enumValue = toEnum(value, StatusUserEnum);
    return Object.values(StatusUserEnum).includes(enumValue);
  }

  defaultMessage(args: ValidationArguments): string {
    return `Invalid status value for ${args.property}`;
  }
}
