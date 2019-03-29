var mongoose = require('mongoose');
var Schema = mongoose.Schema


var driverSchema = new Schema({
    
    socketId : String,
    driverId : String,

});


module.exports = mongoose.model('DriverLocation' , driverSchema);
