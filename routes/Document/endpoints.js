/* eslint-disable import/extensions */
import { Router } from 'express';

import {
  create, update, getDocumentByUser, downloadInvoice,
} from './controller.js';

const app = Router();

app.get('/:user_id', getDocumentByUser);
app.post('/', create);
app.patch('/:id', update);
app.get('/downloadInvoice/down', downloadInvoice);

export default app;
