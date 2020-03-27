var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

var positionSchema = new mongoose.Schema({
    position : {
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

module.exports = mongoose.model('Position',positionSchema);
