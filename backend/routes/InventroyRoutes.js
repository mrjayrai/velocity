const express = require('express');
const router = express.Router(); 
const {ReOrderAnalyse} = require('../controllers/ReOrderAnalyse');

router.get('/re-order', ReOrderAnalyse);

module.exports = router;