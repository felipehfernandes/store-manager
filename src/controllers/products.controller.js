const productService = require('../services/products.service');

const findAll = async (_req, res) => {
  const products = await productService.findAll();
  res.status(200).json(products.message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { message, type } = await productService.findById(id);

  if (type) {
    return res.status(404).json({ message });
  }

  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const fromBody = req.body;
  const { message, type } = await productService.insert(fromBody);

  if (type) {
    return res.status(422).json({ message });
  }

  return res.status(201).json(message);
};

module.exports = {
  findAll,
  findById,
  createProduct,
};