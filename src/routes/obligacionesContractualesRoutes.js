const express = require('express');
const router = express.Router();
const {
    obtenerObligacionesContractuales,
    obtenerObligacionContractualPorId,
    crearObligacionContractual,
    actualizarObligacionContractualPorId,
    eliminarObligacionContractualPorId
} = require('../controller/obligacionesContractualesController');
const  validarTokenMiddleware= require('../middleware/userAuthentication')

router.get('/vertodoObligacionesContractuales', validarTokenMiddleware, obtenerObligacionesContractuales);
router.get('/obligacionContractualPorId/:idobligaciones_contractuales', validarTokenMiddleware, obtenerObligacionContractualPorId);
router.post('/crearObligacionContractual', validarTokenMiddleware, crearObligacionContractual);
router.put('/editarObligacionContractual/:idobligaciones_contractuales', validarTokenMiddleware, actualizarObligacionContractualPorId);
router.delete('/eliminarObligacionContractual/:idobligaciones_contractuales', validarTokenMiddleware, eliminarObligacionContractualPorId);

module.exports = router;