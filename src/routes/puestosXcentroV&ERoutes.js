const express = require('express');
const router = express.Router();

const {obtenerPuestVC, obtenerPuestosXcentroC, obtenerPuestosEXcentroC,
    crearPuestoVXcentroC,
    crearPuestoVEXcentroC,
    editarPuestoVxCentroC,
    editarPuestoVExCentroC,
    eliminarPuestoVXcentroC,
    eliminarPuestoVEXcentroC
} = require('../controller/puestosXcentroV&EController')
const  validarTokenMiddleware= require('../middleware/userAuthentication')

router.get('/optenertodospuestosvig', validarTokenMiddleware, obtenerPuestVC);
router.get('/listPuestosXcentro/:idcentro_formacion', validarTokenMiddleware, obtenerPuestosXcentroC)
router.get('/listPuestosEXcentro/:idcentro_formacion', validarTokenMiddleware, obtenerPuestosEXcentroC)
router.post('/crearPVxCentro', validarTokenMiddleware, crearPuestoVXcentroC)
router.post('/crearPVExCentro', validarTokenMiddleware, crearPuestoVEXcentroC)
router.put('/editPVXcentro/:idpuestosvxcentrof', validarTokenMiddleware, editarPuestoVxCentroC)
router.put('/editPVEXcentro/:idpuntosvelectronica', validarTokenMiddleware, editarPuestoVExCentroC)
router.delete('/eliminarPVXcentro/:idpuestosvxcentrof', validarTokenMiddleware, eliminarPuestoVXcentroC)
router.delete('/eliminarPVEXcentro/:idpuntosvelectronica', validarTokenMiddleware, eliminarPuestoVEXcentroC)


module.exports = router