const express = require('express');
const router = express.Router();
const { crearModuloC, obtenerModulosC,editarModuloC, eliminarModuloC } = require('../controller/moduloController');

router.get('/obtenerModulos', obtenerModulosC);
router.post('/crearModulo', crearModuloC);
router.put('/editarPorModulo/:idmodulo', editarModuloC);
router.delete('/eliminarModulo/:idmodulo', eliminarModuloC);

module.exports = router;
