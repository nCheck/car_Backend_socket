
const Mongoose = require('mongoose');
const User = Mongoose.model('User');
const Driver = Mongoose.model('Driver');
const crypto = require('crypto');

module.exports.createUser  = (req , res) =>{
    let b = req.body;
    let pswd = b.password;

    let md5 = crypto.createHash('md5');
    md5.update(pswd);
    var hash = md5.digest('hex');

    let query = {
        username : b.username,
        hash : hash,
        contactNo : b.contactNo,
        name : b.name || 'abby' ,
        isStudent : b.isStudent || true,
        rating : 0.0
    }

    User.create( query , (err , data)=>{

        if(err){
            res.send({err})
        } else{
            res.send({data})
        }

    } )
    

}

module.exports.verifyUser  = (req , res) =>{
    let b = req.body;
    let username = b.username;
    let pswd = b.password;

    console.log(username, pswd)

    if ( username == null || pswd == null ){
        res.send({status : false})
        return;
    }

    let md5 = crypto.createHash('md5');
    md5.update(pswd);
    var hash = md5.digest('hex');

    User.findOne({username}, (err , doc)=>{


        try {
            if(err || doc == null){
                res.send({err,status : false})
            }else if ( doc.hash == hash ){
                res.send({status : true , user : doc})
            }else{
                res.send({status : false})
            }
        }
        catch (e){
            res.send({status : false})
        }

    })


}


module.exports.findUserbyUsername = (req , res) =>{

    var username = req.query.username;
    let query = {
        username
    }

    User.findOne(query , (err , data)=>{

        if(err){
            res.send({err})
        } else{
            res.send({data})
        }

    })

}

module.exports.createDriverProfile = ( req , res ) =>{
    let b = req.body
    var userId = req.params.id;
    let query = {
        carModel : b.carModel,
        carNumber : b.carNumber,
        photoUrl : b.photoUrl,
        licenseUrl : b.licenseUrl,
        experienced : b.experienced
    }

    Driver.create( query , (err , data)=>{

        if(err){
            res.send({err})
        } else{
            var profileId = data._id;

            User.findByIdAndUpdate(userId , { profileId }).then((doc)=>{

                res.send({doc})
        
            }).catch((errr)=>res.send({err : errr}))

        }

    } )


}