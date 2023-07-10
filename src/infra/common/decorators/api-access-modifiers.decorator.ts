import { SetMetadata } from '@nestjs/common';

/**
 * exportamos duas constantes.
 * Uma sendo nossa chave de metadados chamada IS_PUBLIC_KEY,
 * e a outra sendo nosso próprio novo decorador que vamos chamar SkipAuthou;
 * Agora que temos um @SkipAuthou() decorador personalizado,
 * podemos usá-lo para decorar qualquer método, da seguinte forma:
 * -
 * @SkipAuthou()
 * @Get()
 * findAll() {
 *  return [];
 * }
 * Por fim, precisamos AuthGuard retornar true,
 * quando os "isPublic"metadados forem encontrados.
 */
export const IS_PUBLIC_KEY = 'isPublic';
export const SkipAuthou = () => SetMetadata(IS_PUBLIC_KEY, true);
