
const express = require('express');
const router = express.Router();
const {
    crearPuestoC,editarPuestoC,eliminarPuestoC,listarPuestosC
} = require('../controller/puestosVigilanciaController');
const  validarTokenMiddleware= require('../middleware/userAuthentication')

router.get('/puestos', validarTokenMiddleware, listarPuestosC );
router.post('/crearPuesto', validarTokenMiddleware,  crearPuestoC);
router.put('/editarPuesto/:idpuesto_vigilancia', validarTokenMiddleware,  editarPuestoC);
router.delete('/eliminarPuesto/:idpuesto_vigilancia', validarTokenMiddleware, eliminarPuestoC );

module.exports = router;