const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: ' ', // Add your cloud name and API key details
  api_key: ' ',
  api_secret: ' ',
});

module.exports = cloudinary;
