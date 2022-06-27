class apiError extends Error {
  constructor(code, status, message) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

module.exports = {
  //pesan-pesan error, tambah sesuai kebutuhan
  AVAILABLE_DATA: (table, id) => {
    const error = new apiError(
      403,
      "Data already exist",
      `Data exist at ${table} ID ${id}`
    );
    return error;
  },
  EMPTY_TABLE: (table) => {
    const error = new apiError(404, "Data empty", `${table} is empty`);
    return error;
  },
  NOT_FOUND: (table, id) => {
    const error = new apiError(
      404, //code
      "Not found", //status
      `${table} with id ${id} not found` //message
    );
    return error;
  },
  NOT_REGISTERED: (email) => {
    const error = new apiError(404, "Not found", `${email} is not registered`);
    return error;
  },
  EMAIL_REGISTERED: (email) => {
    const error = new apiError(403, "Error", `${email} is already registered`);
    return error;
  },
  INVALID_CRED: new apiError(401, "Error", "Email or password is wrong"),
  UNAUTHORIZED: new apiError(401, "Unauthorized", "Login to use this API"),
};
