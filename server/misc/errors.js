class apiError extends Error {
  constructor(code, status, message) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

module.exports = {
  //pesan-pesan error, tambah sesuai kebutuhan
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
};