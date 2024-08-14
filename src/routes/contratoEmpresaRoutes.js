// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {
    crearContratoEmpresaC,
    obtenerContratoEmpresasC,
    editarContratoEmpresaC,
    eliminarContratoEmpresaC
     } = require('../controller/contratoEmpresaController');

const upload = require('../middleware/pdf_Multer');
const validarTokenMiddleware = require('../middleware/userAuthentication')


router.post('/crearContratoEmpresa', validarTokenMiddleware, upload.single('contrato_pdf'), crearContratoEmpresaC); 
router.get('/listContratosEmpresas', validarTokenMiddleware, obtenerContratoEmpresasC);
router.put('/editContratoEmpresa/:idContrato_empresa', validarTokenMiddleware,  upload.single('contrato_pdf'), editarContratoEmpresaC);
router.delete('/EliminarContratoEmpresa/:idContrato_empresa', validarTokenMiddleware, eliminarContratoEmpresaC);


module.exports = router;
