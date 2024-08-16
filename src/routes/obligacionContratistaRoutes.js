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

router.post('api/crearObligacionContratista', validarTokenMiddleware, crearObligacionesContratistaC); 
router.get('api/listObligacionesContratista', validarTokenMiddleware, obtenerObligacionesContratistaC);
router.get('api/obtenerObligacionContratistaC/:idobligaciones_contratista', validarTokenMiddleware, obtenerObligacionContratistaCID)
router.put('api/editObligacionContratistaapi:idobligaciones_contratista', validarTokenMiddleware,  editarObligacionesContratistaC);
router.delete('api/EliminarObligacionContratistapia/:idobligaciones_contratista', validarTokenMiddleware, eliminarObligacionesContratistaC);


module.exports = router;
