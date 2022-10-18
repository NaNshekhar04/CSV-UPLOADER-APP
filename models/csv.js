const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const filePath = path.join('/uploads/files/csv');

const fileSchema = new mongoose.Schema({
    fieldname: {
      type: String,
      required: true,
    },
    originalname: {
      type: String,
      required: true,
    },
    encoding: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  });
  
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', filePath));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    },
  });
  //multer csv filter
  let csvFilter = (req, file, cb) => {
    if (file.originalname.split('.')[1] === 'csv') {
      cb(null, true);
    } else {
      cb('Upload a Valid CSV File', false);
    }
  };
  
  //define static functions/methods
  fileSchema.statics.uploadedFile = multer({
    storage: storage,
    fileFilter: csvFilter,
  }).single('csv');
  fileSchema.statics.filePath =filePath;
  const CSVFILE = mongoose.model('CSVFILE', fileSchema);
  module.exports = CSVFILE;