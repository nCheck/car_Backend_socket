var mongoose = require('mongoose');
var Schema = mongoose.Schema


var studentSchema = new Schema({
    
    rollNo : Number,
    imageUrl : String

});


module.exports = mongoose.model('Student' , studentSchema);