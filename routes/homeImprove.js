const express = require('express');
const router = express.Router();

const homeImproveController = require('../controllers/homeImprove');

router.get('/', homeImproveController.getAll);

router.post('/', homeImproveController.createDIY);

module.exports = router;