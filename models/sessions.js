const db = require('./db.js')
Schema = db.Schema;

let sessionSchema = new Schema(
    {
        sessionId:String,
        isAvilible:Boolean,
    }
)
module.exports = db.model('sessions', sessionSchema);