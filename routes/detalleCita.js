'use strict'

var express=require('express');
var dcitaController=require('../controllers/detalleCita.js');
var md_auth=require('../middlewares/authenticated');
var md_admin=require('../middlewares/is_admin');


var api=express.Router();

api.get('/pruebas-dcita',md_auth.ensureAuth,dcitaController.pruebas);
api.post('/dcita',[md_auth.ensureAuth,md_admin.isAdmin],dcitaController.saveDCita);
api.get('/dcitas',dcitaController.getDCitas);
api.get('/dcita/:id',dcitaController.getDCita);
api.put('/dcita/:id',[md_auth.ensureAuth,md_admin.isAdmin],dcitaController.updateDCita);
api.delete('/dcita/:id',[md_auth.ensureAuth,md_admin.isAdmin],dcitaController.deleteDCita);
//director del departamento de ciencias administrativas vasquez

module.exports=api;
