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

module.exports = {
  create,
};