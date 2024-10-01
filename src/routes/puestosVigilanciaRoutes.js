
const express = require('express');
const router = express.Router();
const {
    crearPuestoC,editarPuestoC,eliminarPuestoC,listarPuestosC
} = require('../controller/puestosVigilanciaController');
const  validarTokenMiddleware= require('../middleware/userAuthentication')

router.get('/api/puestos', validarTokenMiddleware, listarPuestosC );
router.post('/api/crearPuesto', validarTokenMiddleware,  crearPuestoC);
router.put('/api/apieditarPuesto/:idpuesto_vigilancia', validarTokenMiddleware,  editarPuestoC);
router.delete('/api/eliminarPuesto/:idpuesto_vigilancia', validarTokenMiddleware, eliminarPuestoC );

module.exports = router;