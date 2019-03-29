var express=require('express');
var router=express.Router();
var mongoose = require('mongoose');

const ride = require('../controllers/ride');


router.route('/')
    .post(ride.createRide)
    .get(ride.getRides)





module.exports = router