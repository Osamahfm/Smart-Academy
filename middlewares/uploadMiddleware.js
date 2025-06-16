const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/videos');  // لازم يكون داخل public
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /mp4|mov|webm/;
  const ext = path.extname(file.originalname).toLowerCase();
  allowed.test(ext) ? cb(null, true) : cb(new Error("Only video files allowed"));
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
