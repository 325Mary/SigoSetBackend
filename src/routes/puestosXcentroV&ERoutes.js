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

router.get('/optenertodospuestosvig', obtenerPuestVC);
router.get('/listPuestosXcentro/:idcentro_formacion', obtenerPuestosXcentroC)
router.get('/listPuestosEXcentro/:idcentro_formacion', obtenerPuestosEXcentroC)
router.post('/crearPVxCentro', crearPuestoVXcentroC)
router.post('/crearPVExCentro', crearPuestoVEXcentroC)
router.put('/editPVXcentro/:idpuestosvxcentrof', editarPuestoVxCentroC)
router.put('/editPVEXcentro/:idpuntosvelectronica', editarPuestoVExCentroC)
router.delete('/eliminarPVXcentro/:idpuestosvxcentrof', eliminarPuestoVXcentroC)
router.delete('/eliminarPVEXcentro/:idpuntosvelectronica', eliminarPuestoVEXcentroC)


module.exports = router