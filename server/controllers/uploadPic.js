const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadProfilePic = async (req, res) => {
  try {
    const src = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
      use_filename: true,
      folder: "social_Media_temp",
    });
    fs.unlinkSync(req.files.image.tempFilePath);
    return res.status(200).json({ src: src.secure_url });
  } catch (error) {
    console.log(error);
    return res.status(500).send("cloudinary upload error");
  }
};

module.exports = { uploadProfilePic };
