const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('http2').constants;

const errorMain = (err, req, res, next) => {
  const { statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).send({ message: statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR ? 'Ошибка сервера' : message });

  next();
};

module.exports = errorMain;
