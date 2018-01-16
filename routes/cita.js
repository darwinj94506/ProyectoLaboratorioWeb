'use strict'

var express=require('express');
var citaController=require('../controllers/cita.js');
var md_auth=require('../middlewares/authenticated');
var md_admin=require('../middlewares/is_admin');


var api=express.Router();

api.get('/pruebas-cita',md_auth.ensureAuth,citaController.pruebas);
api.post('/cita',[md_auth.ensureAuth,md_admin.isAdmin],citaController.saveCita);
api.get('/citas',citaController.getCitas);
api.get('/cita/:id',citaController.getCita);
api.put('/cita/:id',[md_auth.ensureAuth,md_admin.isAdmin],citaController.updateCita);
api.delete('/cita/:id',[md_auth.ensureAuth,md_admin.isAdmin],citaController.deleteCita);


module.exports=api;
