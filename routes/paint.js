const express = require('express');
const router = express.Router();
const {paintValidationRules,validate} = require('../middleware/validation')

const paintController = require('../controllers/paint');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', paintController.getAll);

router.post('/', isAuthenticated, paintValidationRules(), validate, paintController.newPaint);

module.exports = router;
