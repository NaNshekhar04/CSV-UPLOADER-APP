const CSVFile = require('../models/csv');
const fs = require('fs');

module.exports.uploader = function(req, res){
    return res.render('uploadCSV', {
        title: 'CSV | upload',
    });
    };


//Viewing the File Action
module.exports.viewFiles = function(req, res){
    let files =  CSVFile.find({});
  return res.render('displayCSV', {
    title: 'View Uploaded Files',
    files: files,
  });
};


//Uploading the File Action
module.exports.upload = function(req, res){
    try{
    CSVFile.uploadedFile(req, res, (err) => {
        if (req.file) {
          let file =  CSVFile.create(req.file);
          return res.status(200).json({
            file: file,
          });
        } else {
          return res.status(400).json({
            message: err,
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
}

//Deleting the Uploaded File Action
module.exports.deleteFile = function(req, res){
    try{
    let file = CSVFile.findById(req.params.id);
    if(file){
        fs.unlinkSync(file.path);
        file.remove();
      }
      return res.status(200).json({
        message: 'SuccessFully Deleted the File',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
}