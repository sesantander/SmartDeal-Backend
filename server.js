/* eslint-disable import/extensions */
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import sequelize from './database/sequelize.js';

import userRouter from './routes/User/endpoints.js';
import documentRouter from './routes/Document/endpoints.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8010;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(multer().array('files'));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/document', documentRouter);

export default app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);

  sequelize.sync({ force: false })
    .then(() => {
      console.log('Connected to the DB');
    }).catch((error) => {
      console.log('Database error:', error);
    });
});
