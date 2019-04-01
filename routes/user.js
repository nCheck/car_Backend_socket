var express=require('express');
var router=express.Router();
var mongoose = require('mongoose');


const user = require('../controllers/user')



router.route('/')
        .post( user.createUser )
        .get(user.findUserbyUsername)


router.route('/verify')
    .post(user.verifyUser)



router.route('/registerDriver')
        .post( user.registerDriver )



router.route('/registerStudent')
        .post( user.registerStudent )







module.exports = router