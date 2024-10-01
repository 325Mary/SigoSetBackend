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

router.get('/api/optenertodospuestosvig', validarTokenMiddleware, obtenerPuestVC);
router.get('/api/listPuestosXcentro/:idcentro_formacion', validarTokenMiddleware, obtenerPuestosXcentroC)
router.get('/api/listPuestosEXcentro/:idcentro_formacion', validarTokenMiddleware, obtenerPuestosEXcentroC)
router.post('/api/crearPVxCentro', validarTokenMiddleware, crearPuestoVXcentroC)
router.post('/api/crearPVExCentro', validarTokenMiddleware, crearPuestoVEXcentroC)
router.put('/api/editPVXcentro/:idpuestosvxcentrof', validarTokenMiddleware, editarPuestoVxCentroC)
router.put('/api/editPVEXcentro/:idpuntosvelectronica', validarTokenMiddleware, editarPuestoVExCentroC)
router.delete('/api/eliminarPVXcentro/:idpuestosvxcentrof', validarTokenMiddleware, eliminarPuestoVXcentroC)
router.delete('/api/eliminarPVEXcentro/:idpuntosvelectronica', validarTokenMiddleware, eliminarPuestoVEXcentroC)


module.exports = router