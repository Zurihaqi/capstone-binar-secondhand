const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const cloudinaryUpload = async (req, res, next) => {
  try {
    const foldering = `my-asset/${req.files[0].mimetype.split("/")[0]}`;
    const product_images = [];
    for (const file of req.files) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: foldering,
        use_filename: true,
        resource_type: "image",
      });
      product_images.push(uploadResult.secure_url);
    }
    req.body.product_images = product_images;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = cloudinaryUpload;
