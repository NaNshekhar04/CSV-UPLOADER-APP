// CONFIGURING DATABASE CONNECTION VIA MONGOOSE!  
// const dotenv = require('dotenv');
const mongoose = require('mongoose');

const uri =  'mongodb+srv://shekhar-04:6S3PVYCKbd4QcHI4@cluster0.mmjw9pb.mongodb.net/test'

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection to Mongo Atlas successful');
  })
  .catch((err) => {
    console.error(`Connection to Mongo Atlas Failed. \n${err}`);
  });


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the MongoDB'));

db.once('open', function(){
    console.log('Connected Successfully to :: MongoDB');
    
})

module.exports = db;