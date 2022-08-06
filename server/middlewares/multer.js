const multer = require("multer");
const errors = require("../misc/errors");
const errorHandler = (error, req, res, next) => {
  if (error.code === "LIMIT_FILE_SIZE") {
    throw errors.FILE_SIZE;
  } else if (error.code === "LIMIT_UNEXPECTED_FILE") {
    throw errors.IMAGE_LIMIT;
  }
  next(error);
};

const mediaStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    const fileType = file.mimetype.split("/")[1];
    const fileName = Date.now() + "-" + file.fieldname + `.${fileType}`;
    //bypass validasi ketika field sudah terisi file
    if (file.fieldname === "product_images") req.body.product_images = true;
    if (file.fieldname === "photo_profile") req.body.photo_profile = true;
    cb(null, fileName);
  },
});

const imageUpload = multer({
  storage: mediaStorage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/webp" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      return cb(null, true);
    }
    cb(null, false);
    return cb(
      new Error("Invalid image format. Allowed format: png, jpg, jpeg, webp")
    );
  },
  limits: {
    fileSize: 5242880,
  },
});

module.exports = {
  imageUpload,
  errorHandler,
};
