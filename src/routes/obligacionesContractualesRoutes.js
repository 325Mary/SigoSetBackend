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
router.get('/obligacionContractualPorId/:id', obtenerObligacionContractualPorId);
router.post('/crearObligacionContractual', crearObligacionContractual);
router.put('/editarObligacionContractual/:id', actualizarObligacionContractualPorId);
router.delete('/eliminarObligacionContractual/:id', eliminarObligacionContractualPorId);

module.exports = router;