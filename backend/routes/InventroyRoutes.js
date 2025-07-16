const express = require('express');
const router = express.Router(); 
const {ReOrderAnalyse} = require('../controllers/ReOrderAnalyse');
const {ReStockAnalyse} = require('../controllers/ReStock');
const {Insight} = require('../controllers/FetchInsights');

router.get('/re-order', ReOrderAnalyse);
router.get('/re-stock', ReStockAnalyse);
router.get('/insights', Insight);

module.exports = router;