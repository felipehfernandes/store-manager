const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const salesQuantitySchema = Joi.number().integer().min(1).required();

module.exports = {
  idSchema,
  productSchema,
  salesQuantitySchema,
};