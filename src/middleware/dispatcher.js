function eventDispatcherMiddleware(req, res, next) {
    req.dispatch = function (event, callback) {
        dispatch(req, event, callback)
    }
    next()
}

function dispatch(req, event, callback) {
    if(!event.type) return callback(new Error(`Invalid event type '${event.type}'`))
    const now = new Date()
    event.occured = now.toISOString()
    req.db.eventStore.insert(event, function (err, eventRecord) {
        if (err) return callback(err)

        req.handle(eventRecord, function (err, aggregate) {
            callback(err, aggregate)
        })
    })
}

module.exports = eventDispatcherMiddleware