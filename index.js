'use strict'

var mongoose=require('mongoose');
var app=require('./app');
var port=process.env.PORT || 3789;

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/zoo',{useMongoClient:true})
        .then(()=>{
            console.log("La conexion a la bdd zoo se ha realizado correctamente...");
            app.listen(port,()=>{
              console.log('el servidor local con node y express esta corriendo');
            })
        }).catch(err=> console.log(err));
