const handle = require('../events/handle')

function eventHandlerMiddleware(req, res, next) {
    req.handle = function (event, callback) {
        handle(req.db, event, callback, next)
    }
    next()
}

module.exports = eventHandlerMiddleware