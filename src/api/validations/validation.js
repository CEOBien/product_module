const Joi = require("joi");

const productValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    NAME: Joi.string().max(255).label("NAME"),
    DESC: Joi.string().label("DESC"),
    CD: Joi.string().max(255).label("CD"),
    CATEGORY_ID: Joi.number().label("CATEGORY_ID"),
    PRICE: Joi.number().label("PRICE"),
  });

  return schema.validate(data);
};

module.exports = {
  productValidate,
};
