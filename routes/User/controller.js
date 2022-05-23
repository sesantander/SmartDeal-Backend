/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../../database/models/user.model.js';
import removeEmpty from '../../utilities/utilities.js';

const signup = async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      await User.create({
        username: req.body.username,
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        phone: req.body.phone,
        photo_url: req.body.photo_url,
        skills: req.body.skills,
        company: req.body.company,
        wallet_address: req.body.wallet_address,
        password: hash,
      }).then((user) => res.status(200).json({ user }))
        .catch((e) => res.status(400).json({ e }));
    });
  } catch (e) {
    next(e);
  }
};
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) return res.status(400).json({ Error: 'User not found' });
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) return res.status(401).json({ message: 'Authentication failed' });
      if (result) {
        const token = jwt.sign({ username: user.username, userId: user.id, role: user.role }, process.env.SECRET_WORD, { expiresIn: '1h' });
        return res.status(200).json({
          token, userId: user.id, username: user.username, role: user.role,
        });
      }
      return res.status(401).json({ message: 'Wrong password' });
    });
  } catch (e) {
    next(e);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { user_id: req.params.id } });
    if (!user) return res.status(400).json({ Error: 'User not found' });
    return res.status(200).json({ user });
  } catch (e) {
    next(e);
  }
};

const getUserByUsername = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } });
    if (!user) return res.status(400).json({ Error: 'User not found' });
    return res.status(200).json({ user });
  } catch (e) {
    next(e);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.findAll();
    if (!user) return res.status(400).json({ Error: 'Users not found' });
    return res.status(200).json({ user });
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const fieldsToUpdate = removeEmpty(req.body);

    const user = await User.findOne({ where: { user_id: req.params.id } });
    if (!user) return res.status(400).json({ Error: 'User not found' });

    await user.update(fieldsToUpdate);
    return res.status(200).json({ user });
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { user_id: req.params.id } });
    if (!user) return res.status(400).json({ Error: 'User not found' });
    user.destroy();
    return res.status(200).json({ user });
  } catch (e) {
    next(e);
  }
};

export {
  signup,
  login,
  getUser,
  getUserByUsername,
  getAllUsers,
  updateUser,
  deleteUser,
};
