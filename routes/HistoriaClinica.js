'use strict'

var express=require('express');
var historiaClinicaController=require('../controllers/HistoriaClinica.js');
var md_auth=require('../middlewares/authenticated');
var md_admin=require('../middlewares/is_admin');


var api=express.Router();

api.get('/pruebas-hclinica',md_auth.ensureAuth,historiaClinicaController.pruebas);
api.post('/hclinica',[md_auth.ensureAuth,md_admin.isAdmin],historiaClinicaController.HClinica);
api.get('/hclinicas',historiaClinicaController.getHClinicas);
api.get('/hclinica/:id',historiaClinicaController.getHClinica);
api.put('/hclinica/:id',[md_auth.ensureAuth,md_admin.isAdmin],historiaClinicaController.updateHClinica);
api.delete('/hclinica/:id',[md_auth.ensureAuth,md_admin.isAdmin],historiaClinicaController.deleteHClinica);


module.exports=api;
