const express = require('express');
const router = express.Router();
const {
    crearsolicitud_puestoC,
    obtenersolicitud_puestoesC,
    editarsolicitud_puestoC,
    eliminarsolicitud_puestoC,
    obtenersolicitud_puestosXcentroC
     } = require('../controller/solicitudPuestosController');
const  validarTokenMiddleware= require('../middleware/userAuthentication')

router.post('api/crearSolicitudes_puestos',validarTokenMiddleware, crearsolicitud_puestoC); 
router.get('api/listSolicitudes_puestos', validarTokenMiddleware, obtenersolicitud_puestoesC);
router.get('api/listSolicitudes_puestos/:idcentro_formacion', validarTokenMiddleware, obtenersolicitud_puestosXcentroC);
router.put('api/editSolicitudes_puestos/:idsolicitud_puesto', validarTokenMiddleware, editarsolicitud_puestoC);
router.delete('api/EliminarSolicitudes_puestos/:idsolicitud_puesto', validarTokenMiddleware, eliminarsolicitud_puestoC);


module.exports = router;
