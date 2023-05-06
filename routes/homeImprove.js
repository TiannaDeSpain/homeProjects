const express = require('express');
const router = express.Router();

const homeImproveController = require('../controllers/homeImprove');

router.get('/', homeImproveController.getAll);

router.post('/', homeImproveController.createDIY);

router.put('/:id', homeImproveController.updateDIY);

router.delete('/:id', homeImproveController.deleteDIY);

module.exports = router;
