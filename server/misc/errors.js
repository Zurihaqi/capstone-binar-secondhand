class apiError extends Error {
  constructor(code, status, message) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

module.exports = {
  //pesan-pesan error, tambah sesuai kebutuhan
  EMPTY_TABLE: new apiError(404, "Not found", "Table is empty"),
  PRODUCT_NOT_FOUND: (id) => {
    const error = new apiError(
      404, //code
      "Not found", //status
      `Product with id ${id} not found` //message
    );
    return error;
  },
  USER_NOT_FOUND: (id) => {
    const error = new apiError(
      404,
      "Not found",
      `User with id ${id} not found`
    );
    return error;
  },
  CATEGORY_NOT_FOUND: (id) => {
    const error = new apiError(
      404,
      "Not found",
      `Category with id ${id} not found`
    );
    return error;
  },
  PRODUCT_IMAGE_NOT_FOUND: (id) => {
    const error = new apiError(
      404,
      "Not found",
      `Product image with id ${id} not found`
    );
    return error;
  },
};
