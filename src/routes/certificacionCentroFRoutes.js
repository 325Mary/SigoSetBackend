 // routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {
    crearCertificacionCentrofC,
    obtenerCertificacionCentrofC,
    editarCertificacionCentrofC,
    eliminarCertificacionCentrofC
     } = require('../controller/certificacionCentroFController');
const checkPerfil = require('../middleware/verificadorDePerfil')
const  validarTokenMiddleware= require('../middleware/userAuthentication')

router.post('/crearCertificacionCentro', validarTokenMiddleware, crearCertificacionCentrofC); 
router.get('/listCertificacionCentro', validarTokenMiddleware, obtenerCertificacionCentrofC);
router.put('/editCertificacionCentro/:idcertificacion_centrof', validarTokenMiddleware, editarCertificacionCentrofC);
router.delete('/EliminarCertificacionCentro/:idcertificacion_centrof', validarTokenMiddleware, eliminarCertificacionCentrofC);


module.exports = router;
