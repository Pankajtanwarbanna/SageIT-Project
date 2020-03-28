var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

var noticeSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    department_id : {
        type : mongoose.Schema.ObjectId,
        required : true
    },
    notice_info : {
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

module.exports = mongoose.model('Notice',noticeSchema);
