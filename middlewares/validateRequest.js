const { validationResult } = require('express-validator');
const { ValidationError } = require('../utils/AppError');

module.exports = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    throw new ValidationError('Validation failed', extractedErrors);
  };
};