const salesService = require('../services/sales.service');

const create = async (req, res) => {
  const reqBody = req.body;
  const { type, message } = await salesService.insert(reqBody);

  if (type && type === 'ID_NOT_FOUND') {
    return res.status(404).json({ message });
  }
  if (type && type === 'INVALID_VALUE') {
    return res.status(422).json({ message });
  }

  return res.status(201).json(message);
};

const findAll = async (req, res) => {
  const { message } = await salesService.findAll();
  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(id);

  if (type) {
    return res.status(404).json({ message });
  }

  return res.status(200).json(message);
};

module.exports = {
  create,
  findAll,
  findById,
};