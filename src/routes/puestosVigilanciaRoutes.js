
const express = require('express');
const router = express.Router();
const {
    crearPuestoC,editarPuestoC,eliminarPuestoC,listarPuestosC
} = require('../controller/puestosVigilanciaController');

router.get('/puestos',listarPuestosC );
router.post('/crearPuesto', crearPuestoC);
router.put('/editarPuesto', editarPuestoC);
router.delete('/eliminarPuesto/:id',eliminarPuestoC );

module.exports = router;