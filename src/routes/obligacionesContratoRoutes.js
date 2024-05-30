const express = require("express")
const router = express.Router()
const obligacionesContratoController = require("../controller/obligacionesContratoController.js")



router.get('/verTodoObligaciones', obligacionesContratoController.verTodoObligaciones);

router.get('/verObligacionPorid', obligacionesContratoController.verObligacionesContratoPorId);

router.post('/crearObligacion', obligacionesContratoController.crearObligacionesContrato);

router.put('/actualizarObligacion', obligacionesContratoController.actualizarObligacionesContrato);

router.delete('/eliminarObligacion', obligacionesContratoController.eliminarObligacionesContratoPorId);

module.exports = router;