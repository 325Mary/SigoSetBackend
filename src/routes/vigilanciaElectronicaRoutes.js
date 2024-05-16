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

router.post('/crearVigilanciaElc', crearVigilanciaElectronicaC); 
router.get('/listVigilanciaElc', obtenerVigilanciaElectronicaC);
router.put('/editVigilanciaElc/:idvigilancia_electronica', editarVigilanciaElectronicaC);
router.delete('/EliminarVigilanciaElc/:idvigilancia_electronica', eliminarVigilanciaElectronicaC);


module.exports = router;
