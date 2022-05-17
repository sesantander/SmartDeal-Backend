/* eslint-disable import/extensions */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */

import Document from '../../database/models/document.model.js';

import removeEmpty from '../../utilities/utilities.js';
import uploadFileToS3 from '../../utilities/uploadToS3.js';

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

export { get, create, update };
