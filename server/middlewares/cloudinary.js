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
    req.body.image_url = uploadResult.secure_url;
    next();
  } catch (error) {
    return res.status(500).json({
      status: "Internal server error",
      message: error.message,
    });
  }
};

module.exports = cloudinaryUpload;
