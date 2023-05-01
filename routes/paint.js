const express = require('express');
const router = express.Router();

const paintController = require('../controllers/paint');

router.get('/', paintController.getAll);

module.exports = router;
