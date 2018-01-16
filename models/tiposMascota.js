'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var TiposMascotaSchema=Schema({
  tim_nombre:String,
  tim_descripcion:String,    
});
module.exports=mongoose.model('TiposMascota',TiposMascotaSchema);
