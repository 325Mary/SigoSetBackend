const express = require('express');
const router = express.Router();
const {
    crearMunicipioC,
    obtenerMunicipiosC,
    obtenerMunicipioPorIdC,
    editarMunicipioC,
    eliminarMunicipioC
} = require('../controller/municipioController');

router.post('/crearMunicipio', crearMunicipioC);
router.get('/obtenerMunicipio', obtenerMunicipiosC);
router.get('/obtenerMunicipio/:idmunicipio', obtenerMunicipioPorIdC);
router.put('/editarMunicipio/:idmunicipio', editarMunicipioC);
router.delete('/eliminarMunicipio/:idmunicipio', eliminarMunicipioC);

module.exports = router;