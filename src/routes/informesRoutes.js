// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {
    obtenerObligaciones
     } = require('../controller/informeController');
     const  validarTokenMiddleware= require('../middleware/userAuthentication')

router.get('/listObligacionesxCentro/:idEmpresa', validarTokenMiddleware, obtenerObligaciones); 

module.exports = router;
