const multer = require("multer");
// const upload = multer({ dest: './public/temp' });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   //path to save the files in your server
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports.upload = multer({ storage });
