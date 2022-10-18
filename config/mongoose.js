const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CSVUploadApp');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the MongoDB'));

db.once('open', function(){
    console.log('Connected Successfully to :: MongoDB');
    
})

module.exports = db;