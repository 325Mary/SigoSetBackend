const router = require('express').Router();
const sedeFormacionController = require('../controller/sedeFormacion.controller')
const {validateSedeFormacionMiddleware} = require('../middleware/sedeFormacion/validarSedeFormacion.middleware')
const  validarTokenMiddleware= require('../middleware/userAuthentication')


router.get('/sedesFormacion', validarTokenMiddleware, sedeFormacionController.getSedesFormacion)
router.get('/sedeFormacion/:idsede_formacion', validarTokenMiddleware, sedeFormacionController.getSedeFormacion )
router.post('/sedeFormacion',validarTokenMiddleware ,sedeFormacionController.crearSedeFormacion )
router.put('/sedeFormacion/:idsede_formacion', validarTokenMiddleware, sedeFormacionController.editarSedeFormacion )
router.delete('/sedeFormacion/:idsede_formacion', validarTokenMiddleware, sedeFormacionController.eliminarSedeFormacion )
router.get('/sedeXcentroFormacion/:idcentro_formacion', validarTokenMiddleware, sedeFormacionController.getSedesPorCentroFormacion )
router.put('/sedeFormacion/:idSedeFormacion/desasignar', validarTokenMiddleware, sedeFormacionController.desasignarSedeController);


module.exports = router;