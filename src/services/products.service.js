const productModel = require('../models/products.model');
const validations = require('./validations/inputValidations');

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

const insert = async (product) => {
  const error = validations.validateProduct(product);

  if (error.type) {
    return error;
  }

  const id = await productModel.insert(product);
  const newProduct = await productModel.findById(id);

  return {
    type: null,
    message: newProduct,
  };
};

const updateProduct = async (id, name) => {
  const error = validations.validateProduct({ name });

  if (error.type) {
    return error;
  }

  const { affectedRows } = await productModel.updateProduct(Number(id), name);

  if (affectedRows === 0) {
    return {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    };
  }

  return {
    type: null,
    message: { id, name },
  };
};

module.exports = {
  findAll,
  findById,
  insert,
  updateProduct,
};