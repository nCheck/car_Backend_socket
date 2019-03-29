var mongoose = require('mongoose');
var Schema = mongoose.Schema


var rideSchema = new Schema({
    
    date : {
        type : Date,
        default : Date.now()
    } , 
    driverId : String,
    riderId : String,
    destination : String,
    source : String,
    price : String,
    completed : {
        type : Boolean,
        default : false
    }
    

});


module.exports = mongoose.model('Ride' , rideSchema);