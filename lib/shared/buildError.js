const buildErrorMessage = (err) => (err.response ? JSON.stringify(err.response.data) : err.message);

const buildError = (prefix, err) => {
  const message = buildErrorMessage(err);
  return new Error(`${prefix}: ${message}`);
};

module.exports = buildError;
