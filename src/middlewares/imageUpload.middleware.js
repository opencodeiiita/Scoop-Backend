const multer = require('multer');

const storage = multer.memoryStorage(); // In-memory storage for temporarily storing files
const upload = multer({ storage: storage });

module.exports = upload;
