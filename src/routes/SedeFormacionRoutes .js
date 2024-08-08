const router = require('express').Router();
const sedeFormacionController = require('../controller/sedeFormacion.controller')
const {validateSedeFormacionMiddleware} = require('../middleware/sedeFormacion/validarSedeFormacion.middleware')

router.get('/sedesFormacion',sedeFormacionController.getSedesFormacion)
router.get('/sedeFormacion/:idsede_formacion',sedeFormacionController.getSedeFormacion )
router.post('/sedeFormacion',sedeFormacionController.crearSedeFormacion )
router.put('/sedeFormacion/:idsede_formacion',sedeFormacionController.editarSedeFormacion )
router.delete('/sedeFormacion/:idsede_formacion',sedeFormacionController.eliminarSedeFormacion )
router.get('/sedeXcentroFormacion/:idcentro_formacion',sedeFormacionController.getSedesPorCentroFormacion )
router.put('/sedeFormacion/:idSedeFormacion/desasignar', sedeFormacionController.desasignarSedeController);


module.exports = router;