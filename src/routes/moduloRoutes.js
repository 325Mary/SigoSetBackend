const express = require('express');
const router = express.Router();
const { crearModuloC, obtenerModulosC,editarModuloC, eliminarModuloC } = require('../controller/moduloController');
const  validarTokenMiddleware= require('../middleware/userAuthentication')

router.get('/api/obtenerModulos', validarTokenMiddleware, obtenerModulosC);
router.post('ap/apii/crearModulo', validarTokenMiddleware, crearModuloC);
router.put('/api//apieditarPorModulo/:idmodulo', validarTokenMiddleware, editarModuloC);
router.delete('/api/eliminarModulo/:idmodulo', validarTokenMiddleware, eliminarModuloC);

module.exports = router;
