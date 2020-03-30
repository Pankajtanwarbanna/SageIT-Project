let mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let attendanceSchema = new mongoose.Schema({
    date : {
        type : Date,
        required : true
    },
    employee_email : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    sign_in : {
        type : Date
    },
    sign_out : {
        type : Date
    },
    lunch_in : {
        type : Date
    },
    lunch_out : {
        type : Date
    },
    note : {
        type : String
    },
    created_by : {
        type : String,
        required : true
    },
    timestamp : {
        type : Date,
        required : true
    }
});

module.exports = mongoose.model('Attendance',attendanceSchema);
