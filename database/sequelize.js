/* eslint-disable import/extensions */
import { Sequelize } from 'sequelize';
import { dbEnvironments } from './config.js';

const sequelize = new Sequelize(
  dbEnvironments.development.database,
  dbEnvironments.development.username,
  dbEnvironments.development.password,
  {
    host: dbEnvironments.development.host,
    dialect: dbEnvironments.development.dialect,
    logging: true,
  },

);

export default sequelize;
