module.exports = function (db) {
  return function dbMiddleware(req, res, next) {
    req.db = db
    next()
  }
}