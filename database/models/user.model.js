/* eslint-disable linebreak-style */
import pkg from 'sequelize';
// eslint-disable-next-line import/extensions
import sequelize from '../sequelize.js';

const { DataTypes } = pkg;

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      min: {
        args: [4],
        msg: 'Username must be equal or greater than 4',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: {
        args: [4],
        msg: 'Password must be equal or greater than 4',
      },
    },
  },
  name: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  phone: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  photo_url: {
    type: DataTypes.STRING,
    unique: true,
  },
  skills: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  wallet_address: {
    type: DataTypes.STRING,
    allowNull: true,
  },

}, {
  timestamps: true,
});

export default User;
