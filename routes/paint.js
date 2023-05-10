const express = require('express');
const router = express.Router();

const paintController = require('../controllers/paint');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', paintController.getAll);

router.post('/', isAuthenticated, paintController.newPaint);

module.exports = router;
