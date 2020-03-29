let mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let projectSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    department_id : {
        type : mongoose.Schema.ObjectId,
        required : true
    },
    members : [String], // store unique email of users
    progress : {
        type : Number,
        required : true
    },
    start_date : {
        type : Date,
        required : true
    },
    deadline : {
        type : Date,
        required : true
    },
    chat : [{
        user_email : String,
        message : String,
        timestamp : Date
    }],
    created_by : {
        type : String,
        required : true
    },
    timestamp : {
        type : Date,
        required : true
    }
});

module.exports = mongoose.model('Project',projectSchema);
