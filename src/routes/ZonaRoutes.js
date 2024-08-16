const router = require('express').Router();
const zonaController = require('../controller/zonaController')
const {validateZonaFormMiddleware} = require('../middleware/zona/zona.middleware')

router.get('api/zonas',zonaController.getZonas )
router.get('api/zona/:idZona',zonaController.getZona )
router.post('apli/zona',validateZonaFormMiddleware,zonaController.crearZona )
router.put('apli/zona/:idZona',zonaController.editarZona )
router.delete('api/zona/:idZona',zonaController.eliminarZona )
module.exports = router;