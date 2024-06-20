const express = require("express");
const router = express.Router();
const {
    crearObligacionesContratoC,
    obtenerObligacionesContratoC,
    editarObligacionesContratoC,
    eliminarObligacionesContratoC
} = require("../controller/obligacionesContratoController");

router.get('/obtenerObligacionesContrato', obtenerObligacionesContratoC);
router.post('/crearObligacion', crearObligacionesContratoC);
router.put('/actualizarObligacion/:idobligaciones_contrato', editarObligacionesContratoC);
router.delete('/eliminarObligacion/:idobligaciones_contrato', eliminarObligacionesContratoC);

module.exports = router;
