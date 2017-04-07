
var mongoose = require('mongoose');

var AppointmentSchema= new mongoose.Schema({
    name: String,
    date: Date,
    time: Date,
    complaint:String,
    },{timestamps:true});

mongoose.model('Appointment', AppointmentSchema)
