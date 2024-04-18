const router = require('express').Router();
const zonaController = require('../controller/zona.controller')
const {validateZonaFormMiddleware} = require('../middleware/zona/zona.middleware')

router.get('/zonas',zonaController.getZonas )
router.get('/zona/:idZona',zonaController.getZona )
router.post('/zona',validateZonaFormMiddleware,zonaController.crearZona )
router.put('/zona/:idZona',zonaController.editarZona )
router.delete('/zona/:idZona',zonaController.eliminarZona )
module.exports = router;