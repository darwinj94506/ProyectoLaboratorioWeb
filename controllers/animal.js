'use strict'
//modulos
 var fs =require('fs');
 var path=require('path');

//modelos
var User =require('../models/user');
var Animal =require('../models/animal');

//servico
var jwt=require('../services/jwt');
//acciones
function pruebas(req,res){
  res.status(200).send({
    message:'probando controlador animales y la accion pruebas',
    user:req.user
  });
}

function saveAnimal(req,res){
  var animal=new Animal();
  var params=req.body;

  if(params.name){ //solo el nombre es obligatorio
    animal.name=params.name;
    animal.description=params.description;
    animal.year=params.year;
    animal.image=null;
    animal.user=req.user.sub;
    animal.save((err,animalStored)=>{
      if(err){
        res.status(500).send({message:'Error en el servidor'});
      }else{
        if(!animalStored){
          res.status(404).send({message:'no se ha guardadoel animal'});
        }else{
          res.status(200).send({animal:animalStored});
        }
      }
    });

  }else{
    res.status(200).send({
      message:'el nombre del animal es obligatorio'
    });

  }
}

function getAnimals(req,res){
  Animal.find({}).populate({path:'user'}).exec((err,animals)=>{
    if(err){
      res.status(500).send({
        message:'error en la peticion'
      });
    }else{
      if(!animals){
        res.status(404).send({
          message:'no hay animales'
        });
      }else{
        res.status(200).send({
          animals
        });
      }
    }
  });
}

//si envio el codigo d eun animal que no existe me esta mandado al erro en la peticion
//cuando deberia enviarme el mensaje de: no existe ese animal
function getAnimal(req,res){
  var animalId=req.params.id;
  Animal.findById(animalId).populate({path:'user'}).exec((err,animal)=>{
    if(err){
      res.status(500).send({
        message:'error en la peticion'
      });
    }else{
      if(!animal){
        res.status(404).send({
          message:'no existe este animal'
        });
      }else{
        res.status(200).send({
          animal
        });
      }
    }

  });

}

function updateAnimal(req,res){
  var animalId=req.params.id;
  var update=req.body;
  Animal.findByIdAndUpdate(animalId,update,{new:true},(err,animalUpdated)=>{
    if(err){
      res.status(500).send({
        message:'Error en la peticion'
      });
    }else{
      if(!animalUpdated){
        res.status(404).send({
          message:'no se ha actualizado el animal'
        });
      }else{
        res.status(200).send({
          animal:animalUpdated
        });
      }
    }
  });

}

function uploadImage(req,res){
  var animalId=req.params.id;
  var file_name='no subido...';
  if(req.files.image){
    var file_path=req.files.image.path;
    var file_split=file_path.split('\\'); //almacena solo el nombre del fichero
    var file_name=file_split[2];
    var ext_split=file_name.split('\.');
    var file_ext=ext_split[1];
    if(file_ext=='png'|| file_ext=='jpg' || file_ext=='jpeg' || file_ext=='gif'){
      // if(userId != req.user.sub){
      //   return res.status(500).send({message:'no tiene permiso para actualizar el usuario'});
      // }
      Animal.findByIdAndUpdate(animalId,{image:file_name},{new:true},(err,animalUpdate)=>{
        if(err){
          res.status(500).send({
            message:'error al actualizar animal'
          });
        }else{
          if(!animalUpdate){
            res.status(404).send({message:'no se ha podido subir la imagen'});
          }else{
            res.status(200).send({animal:animalUpdate, image:file_name});
          }
        }
      });
    }else{
      fs.unlink(file_path,(err)=>{
        if(err){
          res.status(200).send({message:'extension no valida y fichero no borrado'});

        }else{
          res.status(200).send({message:'extension no valida'});

        }
      });

    }

  }else{
    res.status(200).send({message:'no se ha subido archivos'});

  }
}

function getImageFile(req,res){
  var imageFile=req.params.imageFile;
  var path_file='./uploads/animals/'+imageFile;

  fs.exists(path_file,function(exists){
    if(exists){
      console.log("si existe y te mando");
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(404).send({message:'No existe esta imagen'});
      console.log('no existe esta imagen no insista');
    }
  });
}

function deleteAnimal(req,res){
  var animalId=req.params.id;
  Animal.findByIdAndRemove(animalId,(err,animalRemoved)=>{
    if(err){
      res.status(500).send({message:'error en la peticion'});

    }else{
      if(!animalRemoved){
        res.status(404).send({message:'no se ha podido borrar el animal'});
      }else{
        res.status(200).send({animal:animalRemoved});

      }
    }
  });
}

module.exports={
  pruebas,
  saveAnimal,
  getAnimals,
  getAnimal,
  updateAnimal,
  uploadImage,
  getImageFile,
  deleteAnimal
};
