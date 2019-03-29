var app = require('express')();
var http = require('http').Server(app); //Server

var io = require('socket.io')(http);  //Connection Establishing - Driver and 
const path = require('path');
const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const basicAuth = require('express-basic-auth');




io.on('connection', function(socket){

  console.log("Accepting connection")


      socket.on('ready', function(msg){
      
      console.log("driver", msg.id , " is ready")

      socket.join('driver')
  
      });

      socket.on('find', function(msg){
        
        console.log("Finding Ride for" , msg)
        socket.to('driver').emit('request', { ...msg })

        });

      socket.on('sendAcception', function(msg){
        
        socket.to(msg.id).emit('accept', { driverId : msg.driverId , contactNo : msg.contactNo })

      });
  
});


//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));



//DB

require('./models/db')

//Authorization

// app.use(basicAuth({
//   authorizer: myAsyncAuthorizer,
//   authorizeAsync: true,
// }))

// function myAsyncAuthorizer(username, password, cb) {
//   if (username.startsWith('A') && password.startsWith('secret'))
//       return cb(null, true)
//   else
//       return cb(null, false)
// }



//Routes

var rideRoutes = require('./routes/ride');
var userRoutes = require('./routes/user');
var uploadRoutes = require('./controllers/upload')

app.use('/user', userRoutes)
app.use('/ride', rideRoutes);
app.use('/upload', uploadRoutes)

app.get('/request', function(req, res){
  res.sendFile( __dirname + '/views/request.html' )
});

app.get('/', function(req, res){
    res.sendFile( __dirname + '/views/driver.html' )
  });




app.get('/login', (req , res)=>{

  res.send(req.headers)

})

app.get('/test', (req , res)=>{
  res.send({test : true})
})


http.listen(3000, function(){
  console.log('listening on *:3000');
});