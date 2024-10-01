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

router.post('/api/crearDetalleContrato', validarTokenMiddleware, crearDetalleContratoC); 
router.get('/api/listDetalleContratos', validarTokenMiddleware, obtenerdetalleContratosC);
router.put('/api/editDetalleContrato/:iddetalle_contrato', validarTokenMiddleware, editarDetalleContratosC);
router.get('/api/listDporId/:iddetalle_contrato', validarTokenMiddleware, obtenerDetalleContratoPorIdC);
router.get('/api/listDporNombre/:nombreDetalleContrato',validarTokenMiddleware, obtenerDetalleContratoPorNombreC);
router.delete('/api/EliminarDetalleContrato/:iddetalle_contrato',validarTokenMiddleware, eliminardetalleContratoC);


module.exports = router;
