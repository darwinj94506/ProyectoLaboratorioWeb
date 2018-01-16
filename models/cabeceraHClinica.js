'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var CabeceraHClinicaSchema=Schema({
  chc_fecha:String,  
  mascota_id:{type:Schema.ObjectId,ref:'Animal'},
  user:{type:Schema.ObjectId,ref:'User'}
});
module.exports=mongoose.model('CabeceraHClinica',CabeceraHClinicaSchema);
