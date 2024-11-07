import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const { DB_HOST: host, DB_PORT: port, DB_USER: username, DB_PASSWORD: password, DB_DATABASE: database } = process.env;

export default {
  username,
  password,
  database,
  port,
  host,
  dialect: 'mysql',
  migrationStorageTableName: 'sequelize_migrations',
  seederStorageTableName: 'sequelize_seeds',
};
