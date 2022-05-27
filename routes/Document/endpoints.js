/* eslint-disable import/extensions */
import { Router } from 'express';

import {
  get, create, update, getDocumentByUser,
} from './controller.js';

const app = Router();

app.get('/:user_id', getDocumentByUser);
app.post('/', create);
app.patch('/:id', update);

export default app;
