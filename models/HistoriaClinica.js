'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var HClinicaSchema=Schema({
  hic_peso:Number,
  hic_color:String,
  hic_pelaje:String,
  hic_temperatura:Number,
  hic_frecuencia_cardiaca:Number,
  hic_pulso:Number,
  hic_fecha_atencion:String,
  hic_fecha_proxima_atencion:String,
  chc_codigo:{type:Schema.ObjectId,ref:'CabeceraHClinica'},  
  ser_codigo:{type:Schema.ObjectId,ref:'Servicio'},
  hic_diagnostico:String,
  hic_sintomas:String,
  hic_tratamiento:String  
});
module.exports=mongoose.model('HClinica',HClinicaSchema);

