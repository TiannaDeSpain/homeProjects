const express = require('express');
const router = express.Router();
const {homeImproveValidationRules,validate} = require('../helpers/validation')

const homeImproveController = require('../controllers/homeImprove');

router.get('/', homeImproveController.getAll);

router.post('/', homeImproveValidationRules(), validate, homeImproveController.createDIY);

router.put('/:id', homeImproveValidationRules(), validate, homeImproveController.updateDIY);

router.delete('/:id', homeImproveController.deleteDIY);

module.exports = router;
