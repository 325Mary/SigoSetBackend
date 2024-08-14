const express = require('express');
const router = express.Router();
const { crearModuloC, obtenerModulosC,editarModuloC, eliminarModuloC } = require('../controller/moduloController');
const  validarTokenMiddleware= require('../middleware/userAuthentication')

router.get('/obtenerModulos', validarTokenMiddleware, obtenerModulosC);
router.post('/crearModulo', validarTokenMiddleware, crearModuloC);
router.put('/editarPorModulo/:idmodulo', validarTokenMiddleware, editarModuloC);
router.delete('/eliminarModulo/:idmodulo', validarTokenMiddleware, eliminarModuloC);

module.exports = router;
