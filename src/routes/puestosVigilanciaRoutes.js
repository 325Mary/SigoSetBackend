
const express = require('express');
const router = express.Router();
const {
    crearPuestoC,editarPuestoC,eliminarPuestoC,listarPuestosC
} = require('../controller/puestosVigilanciaController');

router.get('/puestos',listarPuestosC );
router.post('/crearPuesto', crearPuestoC);
router.put('/editarPuesto/:idpuesto_vigilancia', editarPuestoC);
router.delete('/eliminarPuesto/:idpuesto_vigilancia',eliminarPuestoC );

module.exports = router;