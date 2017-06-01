const mung = require('express-mung');

/* Remove any internal information from the response. */
function responseRedactionMiddleware(body, req, res) {
    if (Array.isArray(body)) {
        body = body.map(function (object) {
            return redact(object)
        })
    } else {
        body = redact(body)
    }

    return body
}

function redact(object) {
    if(!object) return object
    
    object['_id'] = undefined

    return object
}

module.exports = mung.json(responseRedactionMiddleware)