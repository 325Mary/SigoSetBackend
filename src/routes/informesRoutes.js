// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {
    obtenerObligaciones
     } = require('../controller/informeController');

router.get('/listObligacionesxCentro/:idEmpresa', obtenerObligaciones); 

module.exports = router;
