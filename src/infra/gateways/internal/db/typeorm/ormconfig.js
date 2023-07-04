module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DB_MAIN_PORT || '5432', 10),
  username: process.env.DB_MAIN_USER || 'desenvolvedor',
  password: process.env.DB_MAIN_PASSWORD || 'desenvolvedor',
  database: process.env.DB_MAIN_NAME || 'roles',
  entities: ['dist/modules/**/*.typeorm.schema.impl.js'],
  synchronize: process.env.ENVIRONMENT_TYPE === 'DEVELOPMENT',
  migrationsTableName: 'Migrations',
  migrations: ['src/infra/gateways/internal/db/typeorm/migrations/*.js'],
  seeds: ['src/infra/gateways/internal/db/typeorm/seeds/**/*.js'],
  factories: ['src/infra/gateways/internal/db/typeorm/factories/**/*.js'],
};
