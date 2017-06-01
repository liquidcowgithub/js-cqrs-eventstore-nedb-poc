const birds = require('../domain/birds')

function handle(db, event, callback) {
    const handler = birds.handlers[event.type]

    if(!handler) return callback(new Error(`No registered handler for event type '${event.type}'`))

    handler(db, event, callback)
}

module.exports = handle