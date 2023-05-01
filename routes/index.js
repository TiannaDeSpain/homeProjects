const express = require('express');
const router = express.Router();

router.use('/homeImprove', require('./homeImprove'));
router.use('/paint', require('./paint'));
router.use('/', require('./swagger'));

module.exports = router;
