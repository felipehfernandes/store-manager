const express = require('express');

const productController = require('../controllers/products.controller');

const router = express.Router();

router.get('/', productController.findAll);
router.get('/:id', productController.findById);

module.exports = router;