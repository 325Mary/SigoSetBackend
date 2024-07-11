const express = require('express');
const router = express.Router();
const {
    crearsolicitud_puestoC,
    obtenersolicitud_puestoesC,
    editarsolicitud_puestoC,
    eliminarsolicitud_puestoC,
    obtenersolicitud_puestosXcentroC
     } = require('../controller/solicitudPuestosController');

router.post('/crearSolicitudes_puestos', crearsolicitud_puestoC); 
router.get('/listSolicitudes_puestos', obtenersolicitud_puestoesC);
router.get('/listSolicitudes_puestos/:idcentro_formacion', obtenersolicitud_puestosXcentroC);
router.put('/editSolicitudes_puestos/:idsolicitud_puesto', editarsolicitud_puestoC);
router.delete('/EliminarSolicitudes_puestos/:idsolicitud_puesto', eliminarsolicitud_puestoC);


module.exports = router;
