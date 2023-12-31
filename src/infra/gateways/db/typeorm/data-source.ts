import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as path from 'path';
/**
 * por padrão obtem todas as entidades,
 * mas caso tenha mais de um ORM ou mais de um DB,
 * especifique cada entidade que usa esta conexão
 */
export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DB_MAIN_PORT || '5432', 10),
  username: process.env.DB_MAIN_USER || 'desenvolvedor',
  password: process.env.DB_MAIN_PASSWORD || 'desenvolvedor',
  database: process.env.DB_MAIN_NAME || 'roles',
  entities: ['dist/modules/**/*.schema.typeorm.impl.js'],
  synchronize: process.env.ENVIRONMENT_TYPE === 'DEVELOPMENT',
  migrationsTableName: 'Migrations',
  migrations: [`${__dirname}/migrations/**/*.ts`],
  seeds: [`${__dirname}/seeds/**/*.ts`],
  factories: [`${__dirname}/factories/**/*.ts`],
};

const cliConfig = {
  migrationsDir: 'src/infra/gateways/internal/db/typeorm/migrations',
};
const dataSource = new DataSource(dataSourceOptions);
Object.assign(dataSourceOptions, { cli: cliConfig });
export default dataSource;
