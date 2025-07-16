const express = require('express');
const router = express.Router(); 
const {ReOrderAnalyse} = require('../controllers/ReOrderAnalyse');
const {ReStockAnalyse} = require('../controllers/ReStock');

router.get('/re-order', ReOrderAnalyse);
router.get('/re-stock', ReStockAnalyse);

module.exports = router;