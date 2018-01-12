'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');
// fs    libreria del sistema de ficheros de node
 var fs =require('fs');
 var path=require('path');
//modelos
var User =require('../models/user');
//servico
var jwt=require('../services/jwt');
//acciones
function pruebas(req,res){
  res.status(200).send({
    message:'probando controlador usuarios y la accion pruebas',
    user:req.user
  });
}

function saveUser(req,res){
  //crear el obejeto usuario
  var user = new User();
  //recoger parametros de la peticion
  var params=req.body;
  //asignar valores al objeto usuario
  if(params.password && params.name && params.surname && params.email){
    user.name=params.name;
    user.surname=params.surname;
    user.email=params.email;
    user.role='ROLE_USER';
    user.image=null;
    //comprobar que no exista email para poder guardar
    User.findOne({email:user.email.toLowerCase()},(err,issetUser)=>{
      if(err){
        res.status(500).send({message:'Error al comprobar usuario'});
      }else{
        if(!issetUser){ //si el usuario no ha sido ya registrado
          //cifrar contraseña
          bcrypt.hash(params.password,null,null,function(err,hash){
            user.password=hash;
            user.save((err,userStored)=>{
              if(err){
                res.status(500).send({message:"error al guardar"});
              }else{
                  if(!userStored){
                    res.status(404).send({message:'no se ha registrado el usuario'})
                  }else {
                  console.log('hola'+userStored);
                    res.status(200).send({user:userStored});
                  }
              }
            });
          });

        }else{
          res.status(200).send({
            message:'El usuario ya esta registrado'
          });
        }
      }
    });
  } else{
      res.status(200).send({
      message:'Introduce bien los datos para poder registrar al usuario'
    });
  }
}

function login(req,res){
  var params=req.body;
  var email=params.email;
  var password=params.password;
  User.findOne({email:email.toLowerCase()},(err,user)=>{
    if(err){
      res.status(500).send({message:'Error al comprobar usuario'});
    }else{
      if(user){
        bcrypt.compare(password,user.password,(err,check)=>{
        if(check){
          if(params.gettoken){
              res.status(200).send({
                token:jwt.createToken(user)
              });
          }else{
            console.log('este es el usuario logueado:'+user);
            res.status(200).send({user:user});

          }

          }else{
            res.status(404).send({
              message:'la contraseña no es correcta'
            });
          }
        })

      }else{
        res.status(404).send({
          message:'El usuario no existe'
        });
      }
    }

  })
}

function updateUser(req,res){
  var userId=req.params.id;
  var update=req.body;
  delete update.password;
  if(userId != req.user.sub){
    return res.status(500).send({message:'no tiene permiso para actualizar el usuario'});
  }

  User.findByIdAndUpdate(userId,update,{new:true},(err,userUpdate)=>{
    if(err){
      res.status(500).send({
        message:'error al actualizar usuario'
      });
    }else{
      if(!userUpdate){
        res.status(404).send({message:'no se ha podido actualizar el usuario'});
      }else{
        console.log('usurio actualizado'+userUpdate);
        res.status(200).send({user:userUpdate});

      }
    }
  });
}

function uploadImage(req,res){
  var userId=req.params.id;
  var file_name='no subido...';
  if(req.files){
    var file_path=req.files.image.path;
    var file_split=file_path.split('\\'); //almacena solo el nombre del fichero
    var file_name=file_split[2];

    var ext_split=file_name.split('\.');
    var file_ext=ext_split[1];

    if(file_ext=='png'|| file_ext=='jpg' || file_ext=='jpeg' || file_ext=='gif'){

      if(userId != req.user.sub){
        return res.status(500).send({message:'no tiene permiso para actualizar el usuario'});
      }

      User.findByIdAndUpdate(userId,{image:file_name},{new:true},(err,userUpdate)=>{
        if(err){
          res.status(500).send({
            message:'error al actualizar usuario'
          });
        }else{
          if(!userUpdate){
            res.status(404).send({message:'no se ha podido subir la imagen'});
          }else{
            res.status(200).send({user:userUpdate, image:file_name});
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
  var path_file='./uploads/users/'+imageFile;

  fs.exists(path_file,function(exists){
    if(exists){
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(404).send({message:'No existe esta imagen'});

    }
  });
}

function getKeepers(req,res){
  User.find({role:'ROLE_ADMIN'}).exec((err,users)=>{
    if(err){
      res.status(500).send({message:'error en la peticion'});
    }else{
      if(!users){
        res.status(404).send({message:'No hay cuidadores'});
      }else{
        res.status(200).send({users});
      }
    }
  });
}
module.exports={
  pruebas,
  saveUser,
  login,
  updateUser,
  uploadImage,
  getImageFile,
  getKeepers
};
