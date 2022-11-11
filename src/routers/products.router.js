const express = require('express');

const productController = require('../controllers/products.controller');
const validateName = require('../middlewares/products/validateName.middleware');

const router = express.Router();

router.get('/', productController.findAll);
router.get('/:id', productController.findById);

router.post('/', validateName, productController.createProduct);

module.exports = router;