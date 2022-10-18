const express = require('express');
const router = express.Router();
const csvController = require('../controllers/csvController');


//GET ROUTES
router.get('/viewfiles', csvController.viewFiles);
router.get('/delete/:id', csvController.deleteFile);
router.get('/displaydata/:id', csvController.displayData);
router.get('/displayfiles', csvController.displayfiles);
//POST ROUTES
router.post('/upload', csvController.upload);


module.exports = router;