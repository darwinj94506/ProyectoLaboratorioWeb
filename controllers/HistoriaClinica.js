'use strict'
//modulos
 var fs =require('fs');
 var path=require('path');

//modelos
var User =require('../models/user');
var HClinica =require('../models/HistoriaClinica');

//servico
var jwt=require('../services/jwt');
//acciones
function pruebas(req,res){
  res.status(200).send({
    message:'probando controlador historia clinica y la accion pruebas',
    user:req.user
  });
}

function saveHClinica(req,res){
  var hClinica=new HClinica();
  var params=req.body;

// sdfghj
    hClinica.hic_peso=params.hic_peso;
    hClinica.hic_color=params.hic_color;
    hClinica.hic_pelaje=params.hic_pelaje;
    hClinica.hic_temperatura=params.hic_temperatura;
    hClinica.hic_frecuencia_cardiaca=params.hic_frecuencia_cardiaca;
    hClinica.hic_pulso=params.hic_pulso;
    hClinica.hic_fecha_atencion=params.hic_fecha_atencion;
    hClinica.chc_codigo=params.chc_codigo;
    hClinica.ser_codigo=params.ser_codigo;
    hClinica.hic_diagnostico=params.hic_diagnostico;
    hClinica.hic_sintomas=params.hic_sintomas;
    hClinica.hic_tratamiento=params.hic_tratamiento;  
    hClinica.save((err,hClinicaS)=>{
      if(err){
        res.status(500).send({message:'Error en el servidor'});
      }else{
        if(!hClinicaS){
          res.status(404).send({message:'no se ha guardado la hclinica'});
        }else{
          res.status(200).send({hClinica:hClinicaS});
        }
      }
    });
}

function getHClinicas(req,res){
  HClinica.find({}).populate({path:'chc_codigo'}).populate({path:'ser_codigo'}).exec((err,hclinicas)=>{
    if(err){
      res.status(500).send({
        message:'error en la peticion'
      });
    }else{
      if(hclinicas.length==0){
        res.status(404).send({
          message:'no hay hclinicas'
        });
      }else{
        res.status(200).send({
          hclinicas
        });
      }
    }
  });
}

//si envio el codigo d eun animal que no existe me esta mandado al erro en la peticion
//cuando deberia enviarme el mensaje de: no existe ese animal
function getHClinica(req,res){
  var HClinicaId=req.params.id;
  HClinica.findById(HClinicaId).populate({path:'chc_codigo'}).populate({path:'ser_codigo'}).exec((err,hclinica)=>{
    if(err){
      res.status(500).send({
        message:'error en la peticion'
      });
    }else{
      if(!hclinica){
        res.status(404).send({
          message:'no existe este hClinica'
        });
      }else{
        res.status(200).send({
          hclinica
        });
      }
    }

  });

}

function updateHClinica(req,res){
  var HClinicaId=req.params.id;
  var update=req.body;
  HClinica.findByIdAndUpdate(HClinicaId,update,{new:true},(err,HClinicaIdUpdate)=>{
    if(err){
      res.status(500).send({
        message:'Error en la peticion'
      });
    }else{
      if(!HClinicaIdUpdate){
        res.status(404).send({
          message:'no se ha actualizado el animal'
        });
      }else{
        res.status(200).send({
          HClinica:HClinicaIdUpdate
        });
      }
    }
  });

}



function deleteHClinica(req,res){
  var HClinicaId=req.params.id;
  Animal.findByIdAndRemove(animalId,(err,HClinicaIdRemoved)=>{
    if(err){
      res.status(500).send({message:'error en la peticion'});

    }else{
      if(!HClinicaIdRemoved){
        res.status(404).send({message:'no se ha podido borrar el animal'});
      }else{
        res.status(200).send({HClinicaId:HClinicaIdRemoved});

      }
    }
  });
}

module.exports={
  pruebas,
  saveHClinica,
  getHClinicas,
  getHClinica,
  updateHClinica,
  deleteHClinica
};
