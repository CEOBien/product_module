const createError = require("http-errors");
const {
  productValidate
} = require("../validations/validation");

module.exports.validProduct = (req, res, next) => {
  const { error } = productValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};

