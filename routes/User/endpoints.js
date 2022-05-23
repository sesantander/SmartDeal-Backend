/* eslint-disable import/extensions */
import { Router } from 'express';

import {
  signup,
  login,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserByUsername,
} from './controller.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/:id', getUser);
router.get('/:username', getUserByUsername);
router.get('/', getAllUsers);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
