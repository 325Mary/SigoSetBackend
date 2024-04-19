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

router.post('/crearCertificacionCentro', crearCertificacionCentrofC); 
router.get('/listCertificacionCentro', obtenerCertificacionCentrofC);
router.put('/editCertificacionCentro/:idcertificacion_centrof', editarCertificacionCentrofC);
router.delete('/EliminarCertificacionCentro/:idcertificacion_centrof', eliminarCertificacionCentrofC);


module.exports = router;
