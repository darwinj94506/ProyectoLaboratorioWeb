'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var DetalleCitaSchema=Schema({  
  dci_description:String,    
  servicio_id:{type:Schema.ObjectId,ref:'Servicio'},
  cita_id:{type:Schema.ObjectId,ref:'Cita'}
});
module.exports=mongoose.model('DetalleCita',DetalleCitaSchema);
