const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');

router.get('/', (req, res) => {
  res.render('upload');
});

router.post('/', upload.single('myFile'), (req, res) => {
  console.log(req.file);
  res.send('File uploaded successfully: ' + req.file.filename);
});

module.exports = router;
