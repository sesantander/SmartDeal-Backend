/* eslint-disable import/extensions */
import AWS from 'aws-sdk';
import { nanoid } from 'nanoid';

import dotenv from 'dotenv';

import findFileType from './file-type-finder.js';

const uploadFileToS3 = async (file) => {
  dotenv.config();
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const filename = `document_${nanoid(9)}`;
  const fileContent = Buffer.from(file.buffer);
  const fileType = findFileType(file);
  let fileS3Location = '';

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${filename}.${fileType}`,
    Body: fileContent,
  };

  const uploadDocumentS3 = async () => new Promise((res, rej) => s3.upload(params, (err, data) => {
    if (err) {
      return rej(err);
    }
    return res(data);
  }));

  const data = await uploadDocumentS3(params);

  fileS3Location = data.Location;
  console.log('LOG ~ uploadFileToS3 ~ fileS3Location', fileS3Location);
  return fileS3Location;
};

export default uploadFileToS3;
