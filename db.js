var mongoose = require('mongoose');
require("dotenv").config();
let dbs = process.env.MONGOURL;
mongoose.connect(dbs);


mongoose.connection.on('connected', function () {  
    console.log('Mongoose default connection open to mlab database');
  }); 
  
  // If the connection throws an error
  mongoose.connection.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
  }); 
  
  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {  
    console.log('Mongoose default connection disconnected'); 
  });