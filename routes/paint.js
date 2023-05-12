const express = require('express');
const router = express.Router();
const {paintValidationRules,validate} = require('../middleware/validation')

const paintController = require('../controllers/paint');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', paintController.getAll);

router.post('/', isAuthenticated, paintValidationRules(), validate, paintController.newPaint);

router.put('/:id', isAuthenticated, paintValidationRules(), validate, paintController.updateDIY);

router.delete('/:id', isAuthenticated, paintController.deleteDIY);


module.exports = router;
