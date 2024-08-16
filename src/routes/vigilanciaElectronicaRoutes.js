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

router.post('api/crearVigilanciaElc', validarTokenMiddleware, crearVigilanciaElectronicaC); 
router.get('api/listVigilanciaElc', validarTokenMiddleware,  obtenerVigilanciaElectronicaC);
router.put('api/editVigilanciaElc/:idvigilancia_electronica',validarTokenMiddleware,  editarVigilanciaElectronicaC);
router.delete('api/EliminarVigilanciaElc/:idvigilancia_electronica', validarTokenMiddleware, eliminarVigilanciaElectronicaC);


module.exports = router;
