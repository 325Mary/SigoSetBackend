// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {
    crearMunicipioC,
    obtenerMunicipiosC,
    editarMunicipioC,
    eliminarMunicipioC
     } = require('../controller/municipioController');
const checkPerfil = require('../middleware/verificadorDePerfil')
const  validarTokenMiddleware= require('../middleware/userAuthentication')

router.post('/crearMunicipio', crearMunicipioC); 
router.get('/listMunicipio', obtenerMunicipiosC);
router.put('/editMunicipio/:idmunicipio', editarMunicipioC);
router.delete('/EliminarMunicipio/:idmunicipio', eliminarMunicipioC);


module.exports = router;
