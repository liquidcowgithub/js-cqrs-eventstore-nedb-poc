const events = {
    added: 'BIRD_ADDED',
    deleted: 'BIRD_DELETED',
    updated: 'BIRD_UPDATED'
}

function addBird(db, event, callback) {
    const bird = {
        id: event.id,
        name: event.name,
        weight: event.weight,
        createdDateUtc: (new Date(event.occured)).toISOString()
    }
    db.birds.insert(bird, callback)
}

function updateBird(db, event, callback) {
    const bird = {
        id: event.id,
        name: event.name,
        weight: event.weight,
        lastModifiedDateUtc: (new Date(event.occured)).toISOString()
    }
    db.birds.update({ id: event.id }, bird, function (updateError) {
        if (updateError) return callback(updateError)

        db.birds.findOne({ id: event.id }, function (err, bird) {
            callback(err, bird)
        })
    })
}

function deleteBird(db, event, callback) {
    db.birds.remove({ id: event.id }, callback)
}

const handlers = {}

handlers[events.added] = addBird
handlers[events.deleted] = deleteBird
handlers[events.updated] = updateBird

module.exports = {
    events: events,
    handlers: handlers
}