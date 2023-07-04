import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

/**
 * por padrão obtem todas as entidades,
 * mas caso tenha mais de um ORM ou mais de um DB,
 * especifique cada entidade que usa esta conexão
 */
export const dataSouceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DB_MAIN_PORT || '5432', 10),
  username: process.env.DB_MAIN_USER || 'desenvolvedor',
  password: process.env.DB_MAIN_PASSWORD || 'desenvolvedor',
  database: process.env.DB_MAIN_NAME || 'roles',
  entities: ['dist/modules/**/*.typeorm.schema.js'],
  synchronize: process.env.ENVIRONMENT_TYPE === 'DEVELOPMENT',
  migrationsTableName: 'Migrations',
  migrations: ['dist/infra/gateways/internal/db/typeorm/migrations/*.js'],
  seeds: ['dist/infra/gateways/internal/db/typeorm/seeds/**/*.js'],
  factories: ['dist/infra/gateways/internal/db/typeorm/factories/**/*.js'],
};

const dataSource = new DataSource(dataSouceOptions);
export default dataSource;
