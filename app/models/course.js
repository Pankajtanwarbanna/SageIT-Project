let mongoose = require('mongoose');
let titlize = require('mongoose-title-case');
mongoose.set('useCreateIndex', true);

let courseSchema = new mongoose.Schema({
    course_name : {
        type : String,
        required : true
    },
    department : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    course_url : {
        type : String,
        required : true
    },
    poster : {
        type : String,
        required : true,
        default : 'course.jpeg'
    },
    course_file_url : {
        type : String
    },
    timestamp : {
        type : Date,
        required : true
    }
});

// Mongoose title case plugin
courseSchema.plugin(titlize, {
    paths: [ 'course_name'], // Array of paths
});

module.exports = mongoose.model('Course',courseSchema);
