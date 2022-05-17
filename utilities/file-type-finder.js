const findFileType = ({ mimetype }) => {
  if (mimetype === 'application/pdf') {
    return 'pdf';
  }

  if (mimetype === 'image/jpeg') {
    return 'jpeg';
  }

  if (mimetype === 'image/jpg') {
    return 'jpg';
  }

  if (mimetype === 'image/png') {
    return 'png';
  }

  return null;
};

export default findFileType;
