export enum StatusUserEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}

export function toEnum<T extends string>(
  value: string,
  enumeration: { [key: string]: T },
): T | undefined {
  const enumValues = Object.values(enumeration);
  if (enumValues.includes(value as T)) {
    return value as T;
  }
  return undefined;
}
