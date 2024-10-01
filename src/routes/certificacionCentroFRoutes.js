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

router.post('/api/crearCertificacionCentro', validarTokenMiddleware, crearCertificacionCentrofC); 
router.get('/api/listCertificacionCentro', validarTokenMiddleware, obtenerCertificacionCentrofC);
router.put('/api/editCertificacionCentro/:idcertificacion_centrof', validarTokenMiddleware, editarCertificacionCentrofC);
router.delete('/api/EliminarCertificacionCentro/:idcertificacion_centrof', validarTokenMiddleware, eliminarCertificacionCentrofC);


module.exports = router;
