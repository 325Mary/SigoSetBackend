// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {
    crearEmpresaC,
    obtenerEmpresaC,
    editarEmpresaC,
    eliminarEmpresaC
     } = require('../controller/empresaController');

router.post('/crearEmpresa', crearEmpresaC); 
router.get('/listEmpresa', obtenerEmpresaC);
router.put('/editEmpresa/:idempresa_vigilancia', editarEmpresaC);
router.delete('/EliminarEmpresa/:idempresa_vigilancia', eliminarEmpresaC);


module.exports = router;
