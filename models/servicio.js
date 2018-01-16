'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ServicioSchema=Schema({
  ser_nombre:String,
  ser_precio:Number,
  ser_descripcion:String,
  ser_iva:Boolean,  
});
module.exports=mongoose.model('Servicio',ServicioSchema);
