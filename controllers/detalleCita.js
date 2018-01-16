'use strict'
//modulos
 var fs =require('fs');
 var path=require('path');

//modelos
var User =require('../models/user');
var DCita =require('../models/detalleCita');

//servico
var jwt=require('../services/jwt');
//acciones
function pruebas(req,res){
  res.status(200).send({
    message:'probando controlador detalle cita y la accion pruebas',
    user:req.user
  });
}

function saveDCita(req,res){
  var dCita=new DCita();
  var params=req.body;
    dCita.dci_description=params.dci_description;
    dCita.servicio_id=params.servicio_id;
    dCita.cita_id=params.cita_id;    
    dCita.save((err,dCitaAlmacenado)=>{
      if(err){
        res.status(500).send({message:'Error en el servidor'});
      }else{
        if(!dCitaAlmacenado){
          res.status(404).send({message:'no se ha guardado la detCita'});
        }else{
          res.status(200).send({dCita:dCitaAlmacenado});
        }
      }
    });
}

function getDCitas(req,res){
  Animal.find({}).populate({path:'user'}).exec((err,dCitas)=>{
    if(err){
      res.status(500).send({
        message:'error en la peticion'
      });
    }else{
      if(dCitas.length=0){
        res.status(404).send({
          message:'no hay citas'
        });
      }else{
        res.status(200).send({
            dCitas
        });
      }
    }
  });
}


function getDCita(req,res){
  var citaId=req.params.id;
  Cita.findById(citaId).populate({path:'user'}).exec((err,dcita)=>{
    if(err){
      res.status(500).send({
        message:'error en la peticion'
      });
    }else{
      if(!dcita){
        res.status(404).send({
          message:'no existe este dcita'
        });
      }else{
        res.status(200).send({
          dcita
        });
      }
    }

  });

}

function updateDCita(req,res){
  var citaId=req.params.id;
  var update=req.body;
  Cita.findByIdAndUpdate(citaId,update,{new:true},(err,dcitaUpdated)=>{
    if(err){
      res.status(500).send({
        message:'Error en la peticion'
      });
    }else{
      if(!dcitaUpdated){
        res.status(404).send({
          message:'no se ha actualizado el dcita'
        });
      }else{
        res.status(200).send({
          dcita:dcitaUpdated
        });
      }
    }
  });

}



function deleteDCita(req,res){
  var citaId=req.params.id;
  Animal.findByIdAndRemove(citaId,(err,dCitaRemoved)=>{
    if(err){
      res.status(500).send({message:'error en la peticion'});

    }else{
      if(!dCitaRemoved){
        res.status(404).send({message:'no se ha podido borrar la cita'});
      }else{
        res.status(200).send({dcita:dCitaRemoved});

      }
    }
  });
}

module.exports={
  pruebas,
  saveDCita,
  getDCitas,
  getDCita,
  updateDCita,
  deleteDCita
};
