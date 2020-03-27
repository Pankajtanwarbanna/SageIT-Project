var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

var departmentSchema = new mongoose.Schema({
    department : {
        type : String,
        required : true
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

module.exports = mongoose.model('Department',departmentSchema);
