const Datastore = require('nedb')
const handle = require('../events/handle')

function createDb(fileName) {
    const db = {
        eventStore: new Datastore({ filename: fileName, autoload: true }),
        birds: new Datastore()
    }

    // You can sort in reverse order like this
    db.eventStore.find({}).sort({ occured: 1 }).exec(function (err, eventRecords) {
        eventRecords.map(function (eventRecord) {
            handle(db, eventRecord, function (err) {
                if (err) {
                    console.log(`Replay error: ${eventRecord._id}`)
                    console.error(err)
                }
                console.log(`Replayed event: ${eventRecord.occured} - ${eventRecord.type} - ${eventRecord.id}`)
            })
        })
    });

    return db
}

module.exports = createDb