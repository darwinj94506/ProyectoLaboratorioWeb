'use strict'
//modulos


//modelos
var User =require('../models/user');
var Servicio =require('../models/servicio');

//servico
var jwt=require('../services/jwt');
//acciones
function pruebas(req,res){
  res.status(200).send({
    message:'probando controlador servicios y la accion pruebas',
    user:req.user
  });
}

function saveServicio(req,res){
  var servicio=new Servicio();
  var params=req.body;  
    servicio.ser_nombre=params.ser_nombre;
    servicio.ser_precio=params.ser_precio;
    servicio.ser_descripcion=params.ser_descripcion;
    servicio.ser_iva=params.ser_iva;    
    servicio.save((err,servicioStored)=>{
      if(err){
        res.status(500).send({message:'Error en el servidor'});
      }else{
        if(!servicioStored){
          res.status(404).send({message:'no se ha guardadoel servicio'});
        }else{
          res.status(200).send({servicio:servicioStored});
        }
      }
    });
}

function getServicios(req,res){
  Servicio.find({}).exec((err,servicios)=>{
    if(err){
      res.status(500).send({
        message:'error en la peticion'
      });
    }else{
      if(servicios.length==0){
        res.status(404).send({
          message:'no hay servicios'
        });
      }else{
        res.status(200).send({
            servicios
        });
      }
    }
  });
}

//si envio el codigo d eun animal que no existe me esta mandado al erro en la peticion
//cuando deberia enviarme el mensaje de: no existe ese animal
function getServicio(req,res){
  var servicioId=req.params.id;
  Servicio.findById(servicioId).exec((err,servicio)=>{
    if(err){
      res.status(500).send({
        message:'error en la peticion'
      });
    }else{
      if(!servicio){
        res.status(404).send({
          message:'no existe este servicio'
        });
      }else{
        res.status(200).send({
          servicio
        });
      }
    }

  });

}

function updateServicio(req,res){
  var servicioId=req.params.id;
  var update=req.body;
  Servicio.findByIdAndUpdate(servicioId,update,{new:true},(err,servicioUpdated)=>{
    if(err){
      res.status(500).send({
        message:'Error en la peticion'
      });
    }else{
      if(!servicioUpdated){
        res.status(404).send({
          message:'no se ha actualizado el servicio'
        });
      }else{
        res.status(200).send({
          servicio:servicioUpdated
        });
      }
    }
  });

}


function deleteServicio(req,res){
  var servicioId=req.params.id;
  Servicio.findByIdAndRemove(servicioId,(err,servicioIdRemoved)=>{
    if(err){
      res.status(500).send({message:'error en la peticion'});

    }else{
      if(!servicioIdRemoved){
        res.status(404).send({message:'no se ha podido borrar el servicio'});
      }else{
        res.status(200).send({servicio:servicioIdRemoved});

      }
    }
  });
}

module.exports={
  pruebas,
  saveServicio,
  getServicios,
  getServicio,
  updateServicio,
  deleteServicio
};
