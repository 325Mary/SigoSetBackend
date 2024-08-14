const express = require('express');
const router = express.Router();
const {
    crearMunicipioC,
    obtenerMunicipiosC,
    obtenerMunicipioPorIdC,
    editarMunicipioC,
    eliminarMunicipioC
} = require('../controller/municipioController');
const  validarTokenMiddleware= require('../middleware/userAuthentication')

router.post('/crearMunicipio', validarTokenMiddleware, crearMunicipioC);
router.get('/obtenerMunicipio', validarTokenMiddleware, obtenerMunicipiosC);
router.get('/obtenerMunicipio/:idmunicipio', validarTokenMiddleware,  obtenerMunicipioPorIdC);
router.put('/editarMunicipio/:idmunicipio', validarTokenMiddleware, editarMunicipioC);
router.delete('/eliminarMunicipio/:idmunicipio', validarTokenMiddleware, eliminarMunicipioC);

module.exports = router;