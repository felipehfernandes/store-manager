const express = require('express');

const salesController = require('../controllers/sales.controller');
const validateSale = require('../middlewares/sales/validateSale.middleware');

const router = express.Router();

router.post('/', validateSale, salesController.create);

module.exports = router;