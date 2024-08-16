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


router.post('api/crearEmpresa', validarTokenMiddleware, crearEmpresaC); 
router.get('api/listEmpresa', validarTokenMiddleware, obtenerEmpresaC);
router.put('api/editEmpresa/:idempresa', validarTokenMiddleware, editarEmpresaC);
router.delete('api//EliminarEmpresa/:idempresa', validarTokenMiddleware, eliminarEmpresaC);


module.exports = router;
