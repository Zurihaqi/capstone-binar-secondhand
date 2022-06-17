const multer = require("multer");
const fileSizeLimitErrorHandler = (err, req, res, next) => {
  if (err) {
    return res.status(400).json({
      status: "Error",
      message: "File size too big. Max image size is 5MB",
    });
  }
  next();
};

const mediaStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    const fileType = file.mimetype.split("/")[1];
    const fileName = Date.now() + "-" + file.fieldname + `.${fileType}`;
    cb(null, fileName);
  },
});

const imageUpload = multer({
  storage: mediaStorage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      return cb(null, true);
    }
    cb(null, false);
    return cb(
      new Error("Invalid image format. Allowed format: png, jpg, jpeg")
    );
  },
  limits: {
    fileSize: 5242880,
  },
});

module.exports = {
  imageUpload,
  fileSizeLimitErrorHandler,
};
