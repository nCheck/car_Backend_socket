var mongoose = require('mongoose');
var Schema = mongoose.Schema


var driverSchema = new Schema({
    
    carModel : String,
    carNumber : String,
    photoUrl : String,
    licenseUrl : String,
    experienced : Boolean

});


module.exports = mongoose.model('Driver' , driverSchema);

/*
{
    "status": 200,
    "msg": "OK",
    "result": {
        "id": "167500520",
        "folderid": "7225857"
    }
}
*/