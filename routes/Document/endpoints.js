/* eslint-disable import/extensions */
import { Router } from 'express';

import { get, create, update } from './controller.js';

const app = Router();

app.get('/:id', get);
app.post('/', create);
app.patch('/:id', update);

export default app;
