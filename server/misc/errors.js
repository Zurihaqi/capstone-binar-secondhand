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
  AVAILABLE_EMAIL: () => {
    const error = new apiError(
      409,
      "Email already exist",
      `Email already exist but its not you`
    );
    return error;
  },
  EMPTY_TABLE: (table) => {
    const error = new apiError(
      404,
      "Not found",
      `${table} is empty or no results found`
    );
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
  INVALID_CRED: new apiError(401, "Error", "Wrong email or password"),
  UNAUTHORIZED: new apiError(401, "Unauthorized", "Login to use this API"),
  FILE_SIZE: new apiError(
    400,
    "Error",
    "File size too big. Max image size is 5MB"
  ),
  IMAGE_LIMIT: new apiError(
    400,
    "Error",
    "File exceeds upload limit. product_images: 4 images, photo_profile: 1 image"
  ),
  TENDER_OWN_PRODUCT: new apiError(
    401,
    "Error",
    "Cannot tender your own product."
  ),
  TENDER_ALREADY_ACCEPTED: (id) => {
    const error = new apiError(
      401,
      "Error",
      `Tender with id ${id} is already accepted`
    );
    return error;
  },
  INVALID_PAYMENT_STATUS: new apiError(
    401,
    "Error",
    "payment_status is invalid. Enter 'PAID', 'PENDING' or 'FAILED'"
  ),
  PRODUCT_LIMIT: new apiError(
    401,
    "Error",
    "Product limit reached. Each user is limited to 4 published products"
  ),
};
