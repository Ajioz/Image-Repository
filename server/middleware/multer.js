const multer = require('multer');

//Set Storage
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        let ext = file.originalname.substr(file.originalname.lastIndexOf('.'));  //Getting the file extension
        cb(null, file.fieldname +'-'+ Date.now() + ext)
    }
})

store = multer({ storage }).array('images', 120)

const catchError = (req, res, next) => {
    store(req, res, err => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res.send("Too many files to upload.");
        }
      } else if (err) {
        return res.send(err);
      }
      next();
    });
  };
  
 


module.exports = store;
module.exports = catchError;