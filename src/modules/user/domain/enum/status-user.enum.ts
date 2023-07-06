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

export function getEnumKeyByValue(
  enumObject: any,
  value: string,
): string | undefined {
  return Object.keys(enumObject).find((key) => enumObject[key] === value);
}
