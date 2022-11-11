const productModel = require('../models/products.model');
const validations = require('./validations/productValidations');

const findAll = async () => {
  const products = await productModel.findAll();
  return {
    type: null,
    message: products,
  };
};

const findById = async (id) => {
  const error = validations.validateId(id);
  const product = await productModel.findById(id);

  if (error.type) {
    return error;
  }

  if (product) {
    return {
      type: null,
      message: product,
    };
  }

  return {
    type: 'PRODUCT_NOT_FOUND',
    message: 'Product not found',
  };
};

module.exports = {
  findAll,
  findById,
};