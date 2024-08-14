const express = require("express");
const router = express.Router();
const {
    crearObligacionesContratoC,
    obtenerObligacionesContratoC,
    editarObligacionesContratoC,
    eliminarObligacionesContratoC,
    obtenerObligacionesContratoIdC
} = require("../controller/obligacionesContratoController");
const  validarTokenMiddleware= require('../middleware/userAuthentication')

router.get('/obtenerObligacionContratoId/:idobligaciones_contrato', validarTokenMiddleware, obtenerObligacionesContratoIdC);
router.get('/obtenerObligacionesContrato', validarTokenMiddleware, obtenerObligacionesContratoC);
router.post('/crearObligacion', validarTokenMiddleware, crearObligacionesContratoC);
router.put('/actualizarObligacion/:idobligaciones_contrato', validarTokenMiddleware, editarObligacionesContratoC);
router.delete('/eliminarObligacion/:idobligaciones_contrato', validarTokenMiddleware, eliminarObligacionesContratoC);

module.exports = router;
