var mongoose = require('mongoose');
var titlize = require('mongoose-title-case');
mongoose.set('useCreateIndex', true);

var assetSchema = new mongoose.Schema({
    item : {
        type : String,
        required : true
    },
    employee_email : {
        type : String,
        required : true
    },
    issue_date : {
        type : Date,
        required : true
    },
    return_date : {
        type : Date,
        required : true
    },
    status : {
        type : String,
        required : true,
        default : 'pending'
    },
    received_on : {
        type : Date
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

// Mongoose title case plugin
assetSchema.plugin(titlize, {
    paths: [ 'item'], // Array of paths
});

module.exports = mongoose.model('Asset',assetSchema);
