// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {
    crearEmpresaC,
    obtenerEmpresaC,
    editarEmpresaC,
    eliminarEmpresaC
     } = require('../controller/empresaController');
const validarTokenMiddleware = require('../middleware/userAuthentication')


router.post('/crearEmpresa', validarTokenMiddleware, crearEmpresaC); 
router.get('/listEmpresa', validarTokenMiddleware, obtenerEmpresaC);
router.put('/editEmpresa/:idempresa', validarTokenMiddleware, editarEmpresaC);
router.delete('/EliminarEmpresa/:idempresa', validarTokenMiddleware, eliminarEmpresaC);


module.exports = router;
