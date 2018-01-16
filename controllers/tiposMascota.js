'use strict'
//modulos


//modelos
var User =require('../models/user');
var TMasc =require('../models/animal');

//servico
var jwt=require('../services/jwt');
//acciones
function pruebas(req,res){
  res.status(200).send({
    message:'probando controlador TMasc y la accion pruebas',
    user:req.user
  });
}

function saveTMasc(req,res){
  var tMasc=new TMasc();
  var params=req.body;
  
    tMasc.tim_nombre=params.tim_nombre;
    tMasc.tim_descripcion=params.tim_descripcion;
    tMasc.save((err,TMascStored)=>{
      if(err){
        res.status(500).send({message:'Error en el servidor'});
      }else{
        if(!TMascStored){
          res.status(404).send({message:'no se ha guardadoel TMascStored'});
        }else{
          res.status(200).send({TMasc:TMascStored});
        }
      }
    });
}

function getTMascs(req,res){
  TMasc.find({}).exec((err,TMascsE)=>{
    if(err){
      res.status(500).send({
        message:'error en la peticion'
      });
    }else{
      if(TMascsE.length==0){
        res.status(404).send({
          message:'no hay TMascsE'
        });
      }else{
        res.status(200).send({
          TMascsE
        });
      }
    }
  });
}

//si envio el codigo d eun animal que no existe me esta mandado al erro en la peticion
//cuando deberia enviarme el mensaje de: no existe ese animal
function getTMasc(req,res){
  var tmascId=req.params.id;
  TMasc.findById(tmascId).exec((err,tmascE)=>{
    if(err){
      res.status(500).send({
        message:'error en la peticion'
      });
    }else{
      if(!tmascE){
        res.status(404).send({
          message:'no existe este tmascE'
        });
      }else{
        res.status(200).send({
          tmascE
        });
      }
    }

  });

}

function updateTMasc(req,res){
  var tmascId=req.params.id;
  var update=req.body;
  TMasc.findByIdAndUpdate(tmascId,update,{new:true},(err,tmascIdUpd)=>{
    if(err){
      res.status(500).send({
        message:'Error en la peticion'
      });
    }else{
      if(!tmascIdUpd){
        res.status(404).send({
          message:'no se ha actualizado el tmascIdUpd'
        });
      }else{
        res.status(200).send({
          tmasc:tmascIdUpd
        });
      }
    }
  });

}


function deleteTMasc(req,res){
  var tmascId=req.params.id;
  TMasc.findByIdAndRemove(tmascId,(err,TmascRemoved)=>{
    if(err){
      res.status(500).send({message:'error en la peticion'});

    }else{
      if(!TmascRemoved){
        res.status(404).send({message:'no se ha podido borrar el TmascRemoved'});
      }else{
        res.status(200).send({tmasc:TmascRemoved});

      }
    }
  });
}

module.exports={
  pruebas,
  saveTMasc,
  getTMasc,
  getTMascs,
  updateTMasc,
  deleteTMasc
};
