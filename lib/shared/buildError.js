const buildErrorMessage = (err) => {
  if(err.response) {
    const response = err.response.data ? err.response.data : { status: err.response.status, message: err.response.statusText }

    return JSON.stringify(response);
  };

  return err.message;
}

const buildError = (prefix, err) => {
  const message = buildErrorMessage(err);
  return new Error(`${prefix}: ${message}`);
};

module.exports = buildError;
