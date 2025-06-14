const { NotFoundError } = require('../utils/AppError');

module.exports = (req, res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
};