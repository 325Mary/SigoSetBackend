// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {
    crearVigilanciaElectronicaC,
    obtenerVigilanciaElectronicaC,
    editarVigilanciaElectronicaC,
    eliminarVigilanciaElectronicaC
     } = require('../controller/vigilanciaElectronicaController');
const checkPerfil = require('../middleware/verificadorDePerfil')
const  validarTokenMiddleware= require('../middleware/userAuthentication')

router.post('/crearVigilanciaElc', validarTokenMiddleware, crearVigilanciaElectronicaC); 
router.get('/listVigilanciaElc', validarTokenMiddleware,  obtenerVigilanciaElectronicaC);
router.put('/editVigilanciaElc/:idvigilancia_electronica',validarTokenMiddleware,  editarVigilanciaElectronicaC);
router.delete('/EliminarVigilanciaElc/:idvigilancia_electronica', validarTokenMiddleware, eliminarVigilanciaElectronicaC);


module.exports = router;
