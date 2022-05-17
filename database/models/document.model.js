/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */

import pkg from 'sequelize';
import sequelize from '../sequelize.js';

const { DataTypes } = pkg;

const Document = sequelize.define('Document', {
  document_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  document_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },

}, {
  timestamps: true,
});

export default Document;
