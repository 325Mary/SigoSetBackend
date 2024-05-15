const express = require('express');
const router = express.Router();
const puestoVigilanciaController = require('../controller/puestosVigilanciaController');

router.get('/puestos', puestoVigilanciaController.obtenerPuestosC);
router.get('/puestoporid', puestoVigilanciaController.obtenerPuestoPorIdC);
router.post('/crearPuesto', puestoVigilanciaController.crearPuestoC);
router.put('/editarPuesto', puestoVigilanciaController.editarPuestoC);
router.delete('/eliminarPuesto', puestoVigilanciaController.eliminarPuestoC);

module.exports = router;