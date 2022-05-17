const removeEmpty = (obj) => {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value === '' || value === null || value === undefined) {
      delete obj[key];
    }
  });
  return obj;
};

export default removeEmpty;
