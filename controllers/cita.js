'use strict'
//modulos
 var fs =require('fs');
 var path=require('path');

//modelos
var User =require('../models/user');
var Cita =require('../models/cita');

//servico
var jwt=require('../services/jwt');
//acciones
function pruebas(req,res){
  res.status(200).send({
    message:'probando controlador cita y la accion pruebas',
    user:req.user
  });
}

function saveCita(req,res){
  var cita=new Cita();
  var params=req.body;    
    cita.cit_fecha=params.cit_fecha;
    cita.cit_hora=params.cit_hora;
    cita.cit_descripcion=params.cit_descripcion;    
    cita.user=req.user.sub;
    cita.save((err,citaAlmacenada)=>{
      if(err){
        res.status(500).send({message:'Error en el servidor'});
      }else{
        if(!citaAlmacenada){
          res.status(404).send({message:'no se ha guardado la cita'});
        }else{
          res.status(200).send({cita:citaAlmacenada});
        }
      }
    });

}

function getCitas(req,res){
  Cita.find({}).populate({path:'user'}).exec((err,citas)=>{
    if(err){
      res.status(500).send({
        message:'error en la peticion'
      });
    }else{
      if(citas.length==0){
        res.status(404).send({
          message:'no hay citas'
        });
      }else{
        res.status(200).send({
          citas
        });
      }
    }
  });
}

//si envio el codigo d eun animal que no existe me esta mandado al erro en la peticion
//cuando deberia enviarme el mensaje de: no existe ese animal
function getCita(req,res){
  var citaId=req.params.id;
  Cita.findById(citaId).populate({path:'user'}).exec((err,cita)=>{
    if(err){
      res.status(500).send({
        message:'error en la peticion'
      });
    }else{
      if(!cita){
        res.status(404).send({
          message:'no existe esta cita'
        });
      }else{
        res.status(200).send({
          cita
        });
      }
    }

  });

}

function updateCita(req,res){
  var citaId=req.params.id;
  var update=req.body;
  Cita.findByIdAndUpdate(citaId,update,{new:true},(err,citaUpdated)=>{
    if(err){
      res.status(500).send({
        message:'Error en la peticion'
      });
    }else{
      if(!citaUpdated){
        res.status(404).send({
          message:'no se ha actualizado la cita'
        });
      }else{
        res.status(200).send({
            cita:citaUpdated
        });
      }
    }
  });
}



function deleteCita(req,res){
  var citaId=req.params.id;
  Cita.findByIdAndRemove(citaId,(err,citaRemoved)=>{
    if(err){
      res.status(500).send({message:'error en la peticion'});

    }else{
      if(!citaRemoved){
        res.status(404).send({message:'no se ha podido borrar la cita'});
      }else{
        res.status(200).send({cita:citaRemoved});

      }
    }
  });
}

module.exports={
  pruebas,
  saveCita,
  getCitas,
  getCita,
  updateCita,
  deleteCita
};
