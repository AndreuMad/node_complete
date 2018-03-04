module.exports.middleware = (req, res, next) => {
  const param = req.query.param;

  if(param === 'stop') {
    res.render(`${__dirname}/../views/middleware.hbs`, {
      textMiddleware: 'Middleware stage'
    });
  } else {
    next();
  }
};
