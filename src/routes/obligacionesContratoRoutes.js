const express = require("express");
const router = express.Router();
const {
    crearObligacionesContratoC,
    obtenerObligacionesContratoC,
    editarObligacionesContratoC,
    eliminarObligacionesContratoC,
    obtenerObligacionesContratoIdC
} = require("../controller/obligacionesContratoController");

router.get('/obtenerObligacionContratoId/:idobligaciones_contrato', obtenerObligacionesContratoIdC);
router.get('/obtenerObligacionesContrato', obtenerObligacionesContratoC);
router.post('/crearObligacion', crearObligacionesContratoC);
router.put('/actualizarObligacion/:idobligaciones_contrato', editarObligacionesContratoC);
router.delete('/eliminarObligacion/:idobligaciones_contrato', eliminarObligacionesContratoC);

module.exports = router;
