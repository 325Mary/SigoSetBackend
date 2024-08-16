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

router.get('api/obtenerObligacionContratoId/:idobligaciones_contrato', validarTokenMiddleware, obtenerObligacionesContratoIdC);
router.get('api/obtenerObligacionesContrato', validarTokenMiddleware, obtenerObligacionesContratoC);
router.post('api/crearObligacion', validarTokenMiddleware, crearObligacionesContratoC);
router.put('api/actualizarObligacion/:idobligaciones_contrato', validarTokenMiddleware, editarObligacionesContratoC);
router.delete('api/eliminarObligacion/:idobligaciones_contrato', validarTokenMiddleware, eliminarObligacionesContratoC);

module.exports = router;
