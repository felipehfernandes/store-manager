const salesModel = require('../models/sales.model');
const inputValidations = require('./validations/inputValidations');

const verifyId = async (a) => {
  const productId = a.map((product) => product.productId);
  const allProducts = await Promise.all(productId.map(
    async (p) => inputValidations.validateProductId(Number(p)),
  ));

  const errorId = allProducts.find((product) => product.type === 'ID_NOT_FOUND');

  return errorId;
};

const insert = async (a) => {
  const saleQuantity = a.map((sale) => sale.quantity);
  const saleValidate = saleQuantity.map((sale) => inputValidations.validateSalesQuantity(sale));
  const saleError = saleValidate.find((quantity) => quantity.type === 'INVALID_VALUE');
  
  if (saleError) return saleError;
  
  const idNotFound = await verifyId(a);
  
  if (idNotFound) return idNotFound;
  
  const saleId = await salesModel.insertSale();
  const res = a.map((sale) => salesModel.insert(sale, saleId));
  await Promise.all(res);

  const result = {
    id: saleId,
    itemsSold: a,
  };

  return {
    type: null,
    message: result,
  };
};

const findAll = async () => {
  const result = await salesModel.findAll();
  return {
    type: null,
    message: result,
  };
};

const findById = async (id) => {
  const result = await salesModel.findById(Number(id));

  if (!result || result.length === 0) {
    return {
      type: 'SALE_NOT_FOUND',
      message: 'Sale not found',
    };
  }

  return {
    type: null,
    message: result,
  };
};

module.exports = {
  insert,
  findAll,
  findById,
};