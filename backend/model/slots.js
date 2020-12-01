var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var slotsSchema = new Schema({
	"fromTime":{type:String, default:""},
    "toTime":{type:String, default:""},
    "status": { type:String, default:"unscheduled" },
    "date": { type:Date},
    "created_at":{type: Date, default: Date.now}
});
module.exports = mongoose.model('Slots', slotsSchema, 'Slots');