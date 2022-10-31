// Requiring modules to be used and Setting Up the Schema for our File !

const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const FILE_PATH = path.join('/uploads/csv');
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
  // MULTER CONFIGURATION FOR STORING FILES TO OUR PATH

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/csv' );
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    },
  });

  // ADDING A CSV FILTER TO CONTROL WHICH FILE SHOULD BE UPLOADED AND WHICH SHOULD BE NOT !

  let csvFilter = (req, file, cb) => {
    if (file.originalname.split('.')[1] === 'csv') {
      cb(null, true);
    } else {
      cb('Upload a Valid CSV File', false);
    }
  };

  // DEFINING A STATIC FUNTION FOR UPLOADED FILE 
  
  fileSchema.statics.uploadedFile = multer({
    storage: storage,
    fileFilter: csvFilter,
  }).single('csv');
  fileSchema.statics.filePath =FILE_PATH;
  const CSVFILE = mongoose.model('CSVFILE', fileSchema);
  module.exports = CSVFILE;
