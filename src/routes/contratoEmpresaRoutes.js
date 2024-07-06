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


router.post('/crearContratoEmpresa',upload.single('contrato_pdf'), crearContratoEmpresaC); 
router.get('/listContratosEmpresas', obtenerContratoEmpresasC);
router.put('/editContratoEmpresa/:idContrato_empresa', upload.single('contrato_pdf'), editarContratoEmpresaC);
router.delete('/EliminarContratoEmpresa/:idContrato_empresa', eliminarContratoEmpresaC);


module.exports = router;
