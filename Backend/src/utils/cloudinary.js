const cloudinary = require("cloudinary").v2;
const fs = require("fs");



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    console.log("local path", localFilePath);
    const fileResponse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file uploaded on cloudinary", fileResponse.url);
    fs.unlinkSync(localFilePath);
    return fileResponse;
  } catch (error) {
      // delete locally saved temporary
      //file as cloudinary upload operation failed
    fs.unlinkSync(localFilePath);
    console.log("error in cloudinary while uploading ", error);
    return null;
  }
};

module.exports = {
  cloudinary,
  uploadOnCloudinary,
};
