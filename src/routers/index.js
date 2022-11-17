const express = require('express');

const productRouter = require('./products.router');
const salesRouter = require('./sales.router');

const router = express.Router();

router.use('/products', productRouter);
router.use('/sales', salesRouter);

module.exports = router;