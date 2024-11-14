import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import { logger } from '@utils/logger';

import UserModel from '@models/users.model';
import PassModel from '@models/passes.model';
import TagModel from '@models/tags.model';
import TitleModel from '@models/titles.model';

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

const Users = UserModel(sequelize);
const Passes = PassModel(sequelize);
const Tags = TagModel(sequelize);
const Titles = TitleModel(sequelize);

Passes.belongsTo(Tags, { foreignKey: 'tagId', as: 'tag' });
Passes.belongsTo(Titles, { foreignKey: 'titleId', as: 'title' });
Tags.hasMany(Passes, { foreignKey: 'tagId', as: 'passes' });
Titles.hasMany(Passes, { foreignKey: 'titleId', as: 'passes' });

sequelize
  .sync({ force: false })
  .then(() => logger.info('Database sync complete'))
  .catch(err => logger.error('Database sync failed:', err));

export const DB = {
  Users,
  Passes,
  Tags,
  Titles,
  sequelize,
  Sequelize,
};
