const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const cloudinaryUpload = async (req, res, next) => {
  try {
    //hanya berjalan jika req.files terisi
    if (req.files && req.files[0]) {
      const foldering = `my-asset/${req.files[0].mimetype.split("/")[0]}`;
      let product_images = [];
      let photo_profile = [];
      for (const file of req.files) {
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: foldering,
          use_filename: true,
          resource_type: "image",
        });
        if (file.fieldname === "product_images")
          product_images.push(uploadResult.secure_url);
        if (file.fieldname === "photo_profile")
          photo_profile.push(uploadResult.secure_url);
      }
      if (product_images) req.body.product_images = product_images;
      if (photo_profile) req.body.photo_profile = photo_profile;

      return next();
    }
    if (req.file) {
      const foldering = `my-asset/profile`;
      const file = req.file;
      let photo_profile;
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: foldering,
        use_filename: true,
        resource_type: "image",
      });
      if (file.fieldname === "photo_profile")
        photo_profile = uploadResult.secure_url;
      if (photo_profile) req.body.photo_profile = photo_profile;

      return next();
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = cloudinaryUpload;
