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
router.put('/editEmpresa/:idempresa', editarEmpresaC);
router.delete('/EliminarEmpresa/:idempresa', eliminarEmpresaC);


module.exports = router;
