const express = require('express');
const router = express.Router();
const csvController = require('../controllers/csvController');


//GET ROUTES
router.get('/uploaded', csvController.uploader);
router.get('/viewfiles', csvController.viewFiles);
router.get('/delete/:id', csvController.deleteFile);

//POST ROUTES
router.post('/upload', csvController.upload);


module.exports = router;