const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const cloudinaryUpload = async (req, res, next) => {
  try {
    const foldering = `my-asset/${req.file.mimetype.split("/")[0]}`;
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: foldering,
      use_filename: true,
      resource_type: "auto",
    });
    req.body.uploadResult = uploadResult;
    next();
  } catch (error) {
    if (
      error.message ===
      "Cannot read properties of undefined (reading 'mimetype')"
    ) {
      return res.status(400).json({
        status: "Error",
        message: "image cannot be empty",
      });
    }
    return res.status(500).json({
      status: "Internal server error",
      message: error.message,
    });
  }
};

module.exports = cloudinaryUpload;
