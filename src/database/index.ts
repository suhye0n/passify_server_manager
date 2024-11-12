import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import { logger } from '@utils/logger';

import UserModel from '@models/users.model';
import CouponModel from '@models/coupons.model';
import TagModel from '@models/tags.model';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'mysql',
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    max: 5,
    min: 0,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => logger.info(`${time}ms ${query}`),
  benchmark: true,
});

sequelize
  .authenticate()
  .then(() => logger.info('Database connection successful.'))
  .catch(err => logger.error('Database connection failed:', err));

export const DB = {
  Users: UserModel(sequelize),
  Coupons: CouponModel(sequelize),
  Tags: TagModel(sequelize),
  sequelize,
  Sequelize,
};
