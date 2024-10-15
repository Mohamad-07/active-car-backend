const multer = require('multer');

const storage = multer.memoryStorage(); 

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 20 }, 
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Error: Images only!'));
    }
  },
});

module.exports = upload;
