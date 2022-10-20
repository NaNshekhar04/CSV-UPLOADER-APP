const CSVFile = require('../models/csv');
const fs = require('fs');
const parser = require('csv-parser');


//Displaying the Uploaded Files Action
module.exports.viewFiles = async function (req, res) {
  let files = await CSVFile.find({});
  return res.render('displayCSV', {
    title: 'View Uploaded Files',
    files: files,
  });
};


//Uploading the File Action
module.exports.upload = (req, res) => {
  CSVFile.uploadedFile(req, res, (err) => {
    if (req.file) {
      CSVFile.create(req.file, function (err, csv) {
        if (err) {
          req.flash('error', 'Not uploaded!');
          return res.redirect('back');
        }
        req.flash('success', 'File successfully uploaded');
        return res.redirect('back');
      });
    } else {
      req.flash('error', 'Error Unsupported File Format');

      return res.redirect('back');
    }
  });
};


//Deleting the Uploaded File Action
module.exports.deleteFile = async function (req, res) {
  try {
    let file = await CSVFile.findById(req.params.id);
    if (file) {
      file.remove();
    }
    req.flash('success', 'File Deleted');
    return res.redirect('back');
  } catch (error) {
    console.log(error);
    return res.redirect('back');
  }
}

// Displaying the Uploaded Files Data Action
module.exports.displayData = function (req, res) {
  CSVFile.findById(req.params.id, function (err, file) {
    let path = file.path;
    let results = [];
    fs.createReadStream(path)
      .pipe(parser({ delimiter: ',' }))
      .on('data', (data) => results.push(data))
      .on('error', function (err) {
        console.error(err.message);
      })
      .on('end', () => {
        return res.render('csvData', {
          title: 'File Data',
          data: results,
        });
      });
  });
};