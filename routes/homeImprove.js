const express = require('express');
const router = express.Router();
const {homeImproveValidationRules,validate} = require('../middleware/validation')

const { isAuthenticated } = require("../middleware/authenticate");

const homeImproveController = require('../controllers/homeImprove');

router.get('/', homeImproveController.getAll);

router.post('/', isAuthenticated, homeImproveValidationRules(), validate, homeImproveController.createDIY);

router.put('/:id', isAuthenticated, homeImproveValidationRules(), validate, homeImproveController.updateDIY);

router.delete('/:id', isAuthenticated, homeImproveController.deleteDIY);

module.exports = router;
