const CSVFile = require('../models/csv');
const fs = require('fs');
const parser = require('csv-parser');



//Displaying the Uploaded Files Action
module.exports.viewFiles = async function(req, res){
    let files =  await CSVFile.find({});
  return res.render('displayCSV', {
    title: 'View Uploaded Files',
    files: files,
  });
};


//Uploading the File Action
module.exports.upload = async function(req, res){
    try{
    CSVFile.uploadedFile(req, res, async (err) => {
        if (req.file) {
          let file = await CSVFile.create(req.file);
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
module.exports.deleteFile = async function(req, res){
    try{
    let file = await CSVFile.findById(req.params.id);
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



//Displaying the Uploaded Files Data Action
module.exports.displayData = async function(req, res){
    try {
        let file = await CSVFile.findById(req.params.id);
        let path = file.path;
        let results = [];
        fs.createReadStream(path)
          .pipe(parser({ delimiter: ',' }))
          .on('data', (data) => results.push(data))
          .on('end', () => {
            return res.render('csvData', {
              title: 'File Data',
              data: results,
            });
          });
      } catch (error) {
        return res.status(500).json({
          message: 'Internal Server error',
        });
      }
    };