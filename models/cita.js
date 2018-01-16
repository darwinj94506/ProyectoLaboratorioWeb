'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var CitaSchema=Schema({
  cit_fecha:String,
  cit_hora:String,
  cit_descripcion:Number,  
  user:{type:Schema.ObjectId,ref:'User'}
});
module.exports=mongoose.model('Cita',CitaSchema);
