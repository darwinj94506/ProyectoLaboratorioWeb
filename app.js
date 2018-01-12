'use strict'

var express=require('express');
var bodyParser=require('body-parser');
var app=express();

//cargar rutas
var user_routes=require('./routes/user');

var animal_routes=require('./routes/animal');


//middlewares de body-parser: es una funcion que se ejecuta cuando se hace una peticion http
//se ejecuta antes que se ejecute el metodo para que me devuelva el json

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());//compbierto lo que llega en la peticion a json

//configurar cabeceras y carousel-indicators
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
  res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//rutas base
app.use('/api',user_routes);
app.use('/api',animal_routes);


//rutas body-parser

module.exports=app;
