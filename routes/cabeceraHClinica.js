'use strict'

var express=require('express');
var chclinicaController=require('../controllers/cabeceraHClinica');
var md_auth=require('../middlewares/authenticated');
var md_admin=require('../middlewares/is_admin');


var api=express.Router();

api.get('/pruebas-chclinica',md_auth.ensureAuth,chclinicaController.pruebas);
api.post('/chclinica',[md_auth.ensureAuth,md_admin.isAdmin],chclinicaController.saveCHClinica);
api.get('/chclinicas',chclinicaController.getCHClinicas);
api.get('/chclinica/:id',chclinicaController.getCHClinica);
api.put('/chclinica/:id',[md_auth.ensureAuth,md_admin.isAdmin],chclinicaController.updateCHClinica);
api.delete('/chclinica/:id',[md_auth.ensureAuth,md_admin.isAdmin],chclinicaController.deleteCHClinica);


module.exports=api;
