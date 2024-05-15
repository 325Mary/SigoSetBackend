const express = require("express")
const router = express.Router()
const obligacionesContratoController = requiere("../controller/obligacionesContratoController.js")



router.get('/verTodoObligaciones', obligacionesContratoController.verTodoObligaciones);

router.get('/verObligacionPorid', obligacionesContratoController.gverObligacionesContratoPorId);

router.post('/crearObligacion', obligacionesContratoController.crearObligacionesContrato);

router.put('/actualizarObligacion', obligacionesContratoController.actualizarObligacionesContrato);

router.delete('/eliminarObligacion', obligacionesContratoController.eliminarObligacionesContratoporId);

module.exports = router;