const express = require('express');
const router = express.Router();
const {
    obtenerObligacionesContractuales,
    obtenerObligacionContractualPorId,
    crearObligacionContractual,
    actualizarObligacionContractualPorId,
    eliminarObligacionContractualPorId
} = require('../controller/obligacionesContractualesController');

router.get('/vertodoObligacionesContractuales', obtenerObligacionesContractuales);
router.get('/obligacionContractualPorId/:idobligaciones_contractuales', obtenerObligacionContractualPorId);
router.post('/crearObligacionContractual', crearObligacionContractual);
router.put('/editarObligacionContractual/:idobligaciones_contractuales', actualizarObligacionContractualPorId);
router.delete('/eliminarObligacionContractual/:idobligaciones_contractuales', eliminarObligacionContractualPorId);

module.exports = router;