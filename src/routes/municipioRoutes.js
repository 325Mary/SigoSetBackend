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

router.post('/api/crearMunicipio', validarTokenMiddleware, crearMunicipioC);
router.get('/api/obtenerMunicipio', validarTokenMiddleware, obtenerMunicipiosC);
router.get('/api/obtenerMunicipio/:idmunicipio', validarTokenMiddleware,  obtenerMunicipioPorIdC);
router.put('/api/editarMunicipio/:idmunicipio', validarTokenMiddleware, editarMunicipioC);
router.delete('/api/eliminarMunicipio/:idmunicipio', validarTokenMiddleware, eliminarMunicipioC);

module.exports = router;