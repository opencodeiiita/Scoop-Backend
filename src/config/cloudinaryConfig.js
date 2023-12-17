const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dmtbrezg7', // Add your cloud name and API key details
  api_key: '996388512431838',
  api_secret: 'ewXJd_jD0NNw6qKJ0SVSyCeIc4s',
});

module.exports = cloudinary;
