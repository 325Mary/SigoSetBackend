const express = require('express');
const router = express.Router();
const {
    crearModuloXperfilC,
    obtenerModuloxperfilC,
    editarModuloXperfilC,
    obtenerModuloxperfilListC
} = require('../controller/moduloxperfilController');

router.get('/obtenerModulosXperfil', obtenerModuloxperfilC);
router.post('/crearModuloXperfil', crearModuloXperfilC);
router.put('/editarModuloXperfil/:idmodulo/:idperfil', editarModuloXperfilC);
router.get('/obtenerModulosPorPerfil/:idperfil', obtenerModuloxperfilListC);
module.exports = router;