const express = require('express')
const bodyParser = require('body-parser')
const createDb = require('./src/storage/createDb')
const dbMiddleware = require('./src/middleware/db')
const eventHandlerMiddleware = require('./src/middleware/handler')
const eventDispatcherMiddleware = require('./src/middleware/dispatcher')
const responseRedactionMiddleware = require('./src/middleware/responseRedaction')
const errorMiddleware = require('./src/middleware/error')
const birds = require('./src/api/birds')

const app = express()
const db = createDb('eventStore.db')

app.use(bodyParser.json())
app.use(dbMiddleware(db))
app.use(eventHandlerMiddleware)
app.use(eventDispatcherMiddleware)
app.use(responseRedactionMiddleware)

app.use('/birds', birds)

app.use(errorMiddleware)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})