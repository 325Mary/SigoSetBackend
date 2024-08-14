const express = require('express');
const router = express.Router();
const validarTokenMiddleware = require('../middleware/userAuthentication')

const {
    crearDetalleContratoC,
    obtenerdetalleContratosC,
    editarDetalleContratosC,
    eliminardetalleContratoC,
    obtenerDetalleContratoPorIdC,
    obtenerDetalleContratoPorNombreC
     } = require('../controller/detalleContratoController');
     const upload = require('../middleware/Multer')

router.post('/crearDetalleContrato', validarTokenMiddleware, crearDetalleContratoC); 
router.get('/listDetalleContratos', validarTokenMiddleware, obtenerdetalleContratosC);
router.put('/editDetalleContrato/:iddetalle_contrato', validarTokenMiddleware, editarDetalleContratosC);
router.get('/listDporId/:iddetalle_contrato', validarTokenMiddleware, obtenerDetalleContratoPorIdC);
router.get('/listDporNombre/:nombreDetalleContrato',validarTokenMiddleware, obtenerDetalleContratoPorNombreC);
router.delete('/EliminarDetalleContrato/:iddetalle_contrato',validarTokenMiddleware, eliminardetalleContratoC);


module.exports = router;
