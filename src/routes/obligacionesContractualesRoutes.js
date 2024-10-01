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

router.get('/api/vertodoObligacionesContractuales', validarTokenMiddleware, obtenerObligacionesContractuales);
router.get('/api/obligacionContractualPorId/:idobligaciones_contractuales', validarTokenMiddleware, obtenerObligacionContractualPorId);
router.post('/api/crearObligacionContractual', validarTokenMiddleware, crearObligacionContractual);
router.put('/api/editarObligacionContractual/:idobligaciones_contractuales', validarTokenMiddleware, actualizarObligacionContractualPorId);
router.delete('/api/eliminarObligacionContractual/:idobligaciones_contractuales', validarTokenMiddleware, eliminarObligacionContractualPorId);

module.exports = router;