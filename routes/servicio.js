'use strict'

var express=require('express');
var servicioController=require('../controllers/servicio.js');
var md_auth=require('../middlewares/authenticated');
var md_admin=require('../middlewares/is_admin');


var api=express.Router();

api.get('/pruebas-servicio',md_auth.ensureAuth,servicioController.pruebas);
api.post('/servicio',[md_auth.ensureAuth,md_admin.isAdmin],servicioController.saveServicio);
api.get('/servicios',servicioController.getServicios);
api.get('/servicio/:id',servicioController.getServicio);
api.put('/servicio/:id',[md_auth.ensureAuth,md_admin.isAdmin],servicioController.updateServicio);
api.delete('/servicio/:id',[md_auth.ensureAuth,md_admin.isAdmin],servicioController.deleteServicio);


module.exports=api;
