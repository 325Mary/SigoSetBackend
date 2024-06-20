// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {
    crearDetalleContratoC,
    obtenerdetalleContratosC,
    editarDetalleContratosC,
    eliminardetalleContratoC,
    obtenerDetalleContratoPorIdC,
    obtenerDetalleContratoPorNombreC
     } = require('../controller/detalleContratoController');

router.post('/crearDetalleContrato', crearDetalleContratoC); 
router.get('/listDetalleContratos', obtenerdetalleContratosC);
router.put('/editDetalleContrato/:iddetalle_contrato', editarDetalleContratosC);
router.get('/listDporId/:iddetalle_contrato', obtenerDetalleContratoPorIdC);
router.get('/listDporNombre/:nombreDetalleContrato', obtenerDetalleContratoPorNombreC);
router.delete('/EliminarDetalleContrato/:iddetalle_contrato', eliminardetalleContratoC);


module.exports = router;
