// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {
    crearObligacionesContratistaC,
    obtenerObligacionesContratistaC,
    editarObligacionesContratistaC,
    eliminarObligacionesContratistaC,
    obtenerObligacionContratistaCID
     } = require('../controller/obligacionesContratistaController');

router.post('/crearObligacionContratista', crearObligacionesContratistaC); 
router.get('/listObligacionesContratista', obtenerObligacionesContratistaC);
router.get('/obtenerObligacionContratistaC/:idobligaciones_contratista',obtenerObligacionContratistaCID)
router.put('/editObligacionContratista/:idobligaciones_contratista', editarObligacionesContratistaC);
router.delete('/EliminarObligacionContratista/:idobligaciones_contratista', eliminarObligacionesContratistaC);


module.exports = router;
