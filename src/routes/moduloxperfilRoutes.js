const express = require('express');
const router = express.Router();
const {
    crearModuloXperfilC,
    obtenerModuloxperfilC,
    editarModuloXperfilC,
    obtenerModuloxperfilListC
} = require('../controller/moduloxperfilController');
const  validarTokenMiddleware= require('../middleware/userAuthentication')

router.get('/obtenerModulosXperfil', validarTokenMiddleware, obtenerModuloxperfilC);
router.post('/crearModuloXperfil', validarTokenMiddleware, crearModuloXperfilC);
router.put('/editarModuloXperfil/:idmodulo/:idperfil', validarTokenMiddleware, editarModuloXperfilC);
router.get('/obtenerModulosPorPerfil/:idperfil', validarTokenMiddleware, obtenerModuloxperfilListC);
module.exports = router;