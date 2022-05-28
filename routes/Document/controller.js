/* eslint-disable import/extensions */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */

import pdf from 'pdf-creator-node';
import fs from 'fs';
import Document from '../../database/models/document.model.js';
import User from '../../database/models/user.model.js';

import removeEmpty from '../../utilities/utilities.js';
import uploadFileToS3 from '../../utilities/uploadToS3.js';
import invoiceGenerator from './invoiceGenerator.js';

const create = async (req, res, next) => {
  const uploadedFile = req.files?.[0];
  const url = await uploadFileToS3(uploadedFile);
  const { user_id, document_type } = { ...req.body };

  try {
    await Document.create({
      user_id,
      document_type,
      url,
    }).then((document) => res.status(200).json({ data: { document } }))
      .catch((e) => res.status(400).json({ e }));
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const fieldsToUpdate = removeEmpty(req.body);
    const document = await Document.findOne({ where: { document_id: req.params.id } });
    if (!document) return res.status(400).json({ Error: 'Document not found' });

    await document.update(fieldsToUpdate);
    return res.status(200).json({ data: { document } });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const document = await Document.findOne({ where: { document_id: req.params.id } });
    if (!document) return res.status(400).json({ Error: 'Document not found' });

    return res.status(200).json({ data: { document } });
  } catch (e) {
    next(e);
  }
};

const getDocumentByUser = async (req, res, next) => {
  try {
    const document = await Document.findAll({ where: { user_id: req.params.user_id } });
    if (!document) return res.status(400).json({ Error: 'Document not found' });

    return res.status(200).json({ data: { document } });
  } catch (e) {
    next(e);
  }
};

const downloadInvoice = async (req, res, next) => {
  try {
    const body = { ...req.query };

    const userFrom = await User.findOne({ where: { user_id: body.from_user_id } });
    const userTo = await User.findOne({ where: { user_id: body.to_user_id } });

    const fromUser = {
      name: userFrom.name,
      company: userFrom.company,
      username: userFrom.username,
    };

    const toUser = {
      name: userTo.name,
      company: userTo.company,
      username: userTo.username,
    };

    const html = invoiceGenerator(
      fromUser, toUser, body.withdrawal_date, body.amount, body.method, body.transaction_id,
    );

    const options = {
      format: 'A3',
      orientation: 'portrait',
      border: '10mm',
      header: { },
      footer: { },
    };

    const document = {
      html,
      data: { },
      path: './output.pdf',
      type: '',
    };

    await pdf.create(document, options)
      .then((x) => {
        console.log(x);
      })
      .catch((error) => {
        console.error(error);
      });

    // const file = fs.createReadStream('output.pdf');
    return res.sendFile('output.pdf', { root: '.' });

    // return file.pipe(res);
  } catch (e) {
    next(e);
  }
};

export {
  get,
  create,
  update,
  getDocumentByUser,
  downloadInvoice,
};
