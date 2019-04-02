
const Mongoose = require('mongoose');
const User = Mongoose.model('User');
const Driver = Mongoose.model('Driver');
const Student = Mongoose.model('Student');
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

                if (  ! doc.isStudent ){

                    var profileId = doc.profileId;

                    Driver.findById( profileId,  (err, ddoc) =>{

                        if (err){
                            res.send({status : false})
                        }else{
                            console.log("SENDING ", { status : true ,
                                user : { name : doc.name , contactNo : doc.contactNo , username : doc.username , 
                               photoUrl : ddoc.photoUrl , carNumber : ddoc.carNumber } })
                            res.send({ status : true ,
                                user : { name : doc.name , contactNo : doc.contactNo , username : doc.username , 
                               photoUrl : ddoc.photoUrl , carNumber : ddoc.carNumber } })
                        }

                    })


                }
                else{
                    res.send({ status : true , user : doc })
                }
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


module.exports.registerDriver = ( req, res ) =>{

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
        isStudent : false,
        rating : 0.0
    }



    User.create( query , (err , dataa)=>{

        if(err){
            res.send({err})
        } else{


            const userId = dataa._id;


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

    } )

}

module.exports.registerStudent = ( req , res ) =>{

    var b = req.body;



    let md5 = crypto.createHash('md5');
    md5.update(b.password);
    var hash = md5.digest('hex');

    let query = {
        name : b['name'],
        email : b['email'],
        rollNo : b['rollNo'],
        age : b['age'],
        hash : hash,
        isStudent : b['isStudent'],
        username : b['username']
    }

    console.log("Query", query)

    User.create( query , (err , dataa)=>{

        if(err){
            res.send({err})
        } else{


            const userId = dataa._id;


            Student.create( { rollNo: b.rollNo } , (err , data)=>{

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

    } )



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