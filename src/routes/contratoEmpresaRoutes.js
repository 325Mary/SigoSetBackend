// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {
    crearContratoEmpresaC,
    obtenerContratoEmpresasC,
    editarContratoEmpresaC,
    eliminarContratoEmpresaC
     } = require('../controller/contratoEmpresaController');

router.post('/crearContratoEmpresa', crearContratoEmpresaC); 
router.get('/listContratosEmpresas', obtenerContratoEmpresasC);
router.put('/editContratoEmpresa/:idContrato_empresav', editarContratoEmpresaC);
router.delete('/EliminarContratoEmpresa/:idContrato_empresav', eliminarContratoEmpresaC);


module.exports = router;
