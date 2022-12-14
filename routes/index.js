// ENTRY LEVEL ROUTE FILE FOR OUR APPLICATION 

const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.home);

router.use('/csv', require('./csv'));

module.exports = router;