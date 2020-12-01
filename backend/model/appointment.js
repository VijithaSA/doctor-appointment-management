var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentSchema = new Schema({
    "patientName":{type:String, default:"" },
	"mobNo":{type:String, default:"" },
    "appointmentDate":{type:String, default:""},
    "slotId": {
        type: Schema.Types.ObjectId,
        ref: 'Slots'
    },
    "created_at":{type: Date, default: Date.now}
});
module.exports = mongoose.model('Appointment', appointmentSchema, 'Appointment');