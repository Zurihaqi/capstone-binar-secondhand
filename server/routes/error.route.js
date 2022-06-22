const errorMessages = (error, req, res, next) => {
  if (error.code) {
    return res.status(error.code).json({
      status: error.status,
      message: error.message,
    });
  } else if (
    error.message === "Cannot read properties of undefined (reading 'mimetype')"
  ) {
    return res.status(400).json({
      status: "Error",
      message: "Image cannot be empty",
    });
  } else if (error.message === "Validation error") {
    return res.status(400).json({
      status: "Sequelize validation error",
      message: error.errors.map((e) => e.message),
    });
  }
  const errStack = error.stack.split("\n");
  errStack.shift();
  const errLocation = errStack.map((e) => {
    return e.trim();
  });
  return res.status(500).json({
    status: "Internal server error",
    message: error.message,
    stack: errLocation,
  });
};

module.exports = errorMessages;
