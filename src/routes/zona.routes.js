const router = require('express').Router();
const zonaController = require('../controller/zona.controller')

router.get('/zonas',zonaController.getZonas )
router.get('/zona/:idZona',zonaController.getZona )
router.post('/zona',zonaController.crearZona )
router.put('/zona/:idZona',zonaController.editarZona )
router.delete('/zona/:idZona',zonaController.eliminarZona )
module.exports = router;