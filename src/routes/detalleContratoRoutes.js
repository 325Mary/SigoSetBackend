// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {
    crearDetalleContratoC,
    obtenerdetalleContratosC,
    editarDetalleContratosC,
    eliminardetalleContratoC
     } = require('../controller/detalleContratoController');

router.post('/crearDetalleContrato', crearDetalleContratoC); 
router.get('/listDetalleContratos', obtenerdetalleContratosC);
router.put('/editDetalleContrato/:iddetalle_contrato', editarDetalleContratosC);
router.delete('/EliminarDetalleContrato/:iddetalle_contrato', eliminardetalleContratoC);


module.exports = router;
