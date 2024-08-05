const { logger } = require('../logger');

const middleware = (req, res, next) => {
  logger.info('This middleware runs on every request');
  // Logic for auth , tokenisation and can be done here.
  next();
};

module.exports = middleware;
