import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export const dataSouceOptions: DataSourceOptions & SeederOptions = {
  type: <'postgres'>process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT || '5432', 10),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ['dist/modules/**/*.entity.js'],
  migrationsTableName: 'Migrations',
  migrations: ['dist/db/migrations/**/*.js'],
  seeds: ['dist/db/seeds/**/*.js'],
  factories: ['dist/db/factories/**/*.js'],
};

const dataSource = new DataSource(dataSouceOptions);
export default dataSource;
