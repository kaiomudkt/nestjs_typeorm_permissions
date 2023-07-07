export function toEnum<T extends string>(
  value: string,
  enumeration: { [key: string]: T },
): T | undefined {
  return toEnumByName(value, enumeration) ?? toEnumByValue(value, enumeration);
}

/**
 * converte enum por nome
 * @param name
 * @param enumeration
 * @returns
 */
export function toEnumByName<T extends string>(
  name: string,
  enumeration: { [key: string]: T },
): T | undefined {
  if (Object.keys(enumeration).includes(name)) {
    return enumeration[name];
  }
  return undefined;
}

/**
 * converte enum por valor
 * @param value
 * @param enumeration
 * @returns
 */
export function toEnumByValue<T extends string>(
  value: string,
  enumeration: { [key: string]: T },
): T | undefined {
  const enumValues = Object.values(enumeration);
  if (enumValues.includes(value as T)) {
    return value as T;
  }
  return undefined;
}

/**
 * recebe um enum, e um dos cases do enum
 * e retorna o 'name'/'key' do case do enum
 * @param enumObject enum
 * @param value enum.case
 * @returns string | undefined
 */
export function getEnumKeyByValue(
  enumObject: any,
  value: string,
): string | undefined {
  return Object.keys(enumObject).find((key) => enumObject[key] === value);
}
