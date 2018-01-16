'use strict'

var express=require('express');
var tMascotasController=require('../controllers/tiposMascota.js');
var md_auth=require('../middlewares/authenticated');
var md_admin=require('../middlewares/is_admin');


var api=express.Router();

api.get('/pruebas-tMascota',md_auth.ensureAuth,tMascotasController.pruebas);
api.post('/tMascota',[md_auth.ensureAuth,md_admin.isAdmin],tMascotasController.saveTMasc);
api.get('/tMascotas',tMascotasController.getTMascs);
api.get('/tMascota/:id',tMascotasController.getTMasc);
api.put('/tMascota/:id',[md_auth.ensureAuth,md_admin.isAdmin],tMascotasController.updateTMasc);
api.delete('/tMascota/:id',[md_auth.ensureAuth,md_admin.isAdmin],tMascotasController.deleteTMasc);


module.exports=api;
