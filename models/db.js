var mongoose = require('mongoose'),
	database	 = 'mongodb://sanes4:sanes4ever@ds046667.mlab.com:46667/rickbooker'
	
mongoose.connect(database , { useNewUrlParser: true });
mongoose.connection.on('connected' , () =>{
	console.log('connected')
});

require('./driver')
require('./student')
require('./user')
require('./ride')

