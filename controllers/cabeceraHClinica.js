'use strict'
//modulos

//modelos;
var User =require('../models/user');
var CHClinica =require('../models/cabeceraHClinica');

//servico
var jwt=require('../services/jwt');
//acciones
function pruebas(req,res){
  res.status(200).send({
    message:'probando controlador historia clinica y la accion pruebas',
    user:req.user
  });
}

function saveCHClinica(req,res){
  var CHClinica=new CHClinica();
  var params=req.body;
        
    CHClinica.chc_fecha=params.chc_fecha;
    CHClinica.mascota_id=params.mascota_id;
    CHClinica.user=req.user.sub;
    CHClinica.save((err,CHClinicaAlmacenado)=>{
      if(err){
        res.status(500).send({message:'Error en el servidor'});
      }else{
        if(!CHClinicaAlmacenado){
          res.status(404).send({message:'no se ha guardado la cabecera historia clínica '});
        }else{
          res.status(200).send({CHClinica:CHClinicaAlmacenado});
        }
      }
    });  
}

function getCHClinicas(req,res){
  Animal.find({}).populate({path:'user'}).exec((err,CHClinicas)=>{
    if(err){
      res.status(500).send({
        message:'error en la peticion'
      });
    }else{
      if(CHClinicas.length==0){
        res.status(404).send({
          message:'no hay CHClinicas'
        });
      }else{
        res.status(200).send({
            CHClinicas
        });
      }
    }
  });
}


function getCHClinica(req,res){
  var CHClinicaId=req.params.id;
  CHClinica.findById(CHClinicaId).populate({path:'user'}).exec((err,CHClinicaEncontrado)=>{
    if(err){
      res.status(500).send({
        message:'error en la peticion'
      });
    }else{
      if(!CHClinicaEncontrado){
        res.status(404).send({
          message:'no existe este CHClinica'
        });
      }else{
        res.status(200).send({
            CHClinicaEncontrado
        });
      }
    }

  });

}

function updateCHClinica(req,res){
  var CHClinicaId=req.params.id;
  var update=req.body;
  CHClinica.findByIdAndUpdate(CHClinicaId,update,{new:true},(err,CHClinicaUpdated)=>{
    if(err){
      res.status(500).send({
        message:'Error en la peticion'
      });
    }else{
      if(!CHClinicaUpdated){
        res.status(404).send({
          message:'no se ha actualizado el CHClinica'
        });
      }else{
        res.status(200).send({
            CHClinica:CHClinicaUpdated
        });
      }
    }
  });

}


function deleteCHClinica(req,res){
  var CHClinicaId=req.params.id;
  CHClinica.findByIdAndRemove(CHClinicaId,(err,CHClinicaRemoved)=>{
    if(err){
      res.status(500).send({message:'error en la peticion'});

    }else{
      if(!CHClinicaRemoved){
        res.status(404).send({message:'no se ha podido borrar el CHClinica'});
      }else{
        res.status(200).send({CHClinica:CHClinicaRemoved});

      }
    }
  });
}

module.exports={
  pruebas,
  saveCHClinica,
  getCHClinicas,
  getCHClinica,
  updateCHClinica,
  deleteCHClinica
};
