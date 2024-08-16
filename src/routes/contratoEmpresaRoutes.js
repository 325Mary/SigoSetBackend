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


router.post('api/crearContratoEmpresa', validarTokenMiddleware, upload.single('contrato_pdf'), crearContratoEmpresaC); 
router.get('api/listContratosEmpresas', validarTokenMiddleware, obtenerContratoEmpresasC);
router.put('api/editContratoEmpresa/:idContrato_empresa', validarTokenMiddleware,  upload.single('contrato_pdf'), editarContratoEmpresaC);
router.delete('api/EliminarContratoEmpresa/:idContrato_empresa', validarTokenMiddleware, eliminarContratoEmpresaC);


module.exports = router;
