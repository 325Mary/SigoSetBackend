
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
router.get('/obligacionContractualPorId', obtenerObligacionContractualPorId);
router.post('/crearObligacionContractual', crearObligacionContractual);
router.put('/editarObligacionContractual', actualizarObligacionContractualPorId);
router.delete('/eliminarObligacionContractual', eliminarObligacionContractualPorId);

module.exports = router;