const validateSale = (req, res, next) => {
  const reqBody = req.body;

  for (let i = 0; i < reqBody.length; i += 1) {
    if (reqBody[i].productId === undefined) {
      return res.status(400).json({
        message: '"productId" is required',
      });
    }
    if (reqBody[i].quantity === undefined) {
      return res.status(400).json({
        message: '"quantity" is required',
      });
    }
  }

  return next();
};

module.exports = validateSale;