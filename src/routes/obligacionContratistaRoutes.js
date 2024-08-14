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
const  validarTokenMiddleware= require('../middleware/userAuthentication')

router.post('/crearObligacionContratista', validarTokenMiddleware, crearObligacionesContratistaC); 
router.get('/listObligacionesContratista', validarTokenMiddleware, obtenerObligacionesContratistaC);
router.get('/obtenerObligacionContratistaC/:idobligaciones_contratista', validarTokenMiddleware, obtenerObligacionContratistaCID)
router.put('/editObligacionContratista/:idobligaciones_contratista', validarTokenMiddleware,  editarObligacionesContratistaC);
router.delete('/EliminarObligacionContratista/:idobligaciones_contratista', validarTokenMiddleware, eliminarObligacionesContratistaC);


module.exports = router;
