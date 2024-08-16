const router = require('express').Router();
const sedeFormacionController = require('../controller/sedeFormacion.controller')
const {validateSedeFormacionMiddleware} = require('../middleware/sedeFormacion/validarSedeFormacion.middleware')
const  validarTokenMiddleware= require('../middleware/userAuthentication')


router.get('api/sedesFormacion', validarTokenMiddleware, sedeFormacionController.getSedesFormacion)
router.get('api/sedeFormacion/:idsede_formacion', validarTokenMiddleware, sedeFormacionController.getSedeFormacion )
router.post('api/sedeFormacion',validarTokenMiddleware ,sedeFormacionController.crearSedeFormacion )
router.put('api/sedeFormacion/:idsede_formacion', validarTokenMiddleware, sedeFormacionController.editarSedeFormacion )
router.delete('api/sedeFormacion/:idsede_formacion', validarTokenMiddleware, sedeFormacionController.eliminarSedeFormacion )
router.get('api/sedeXcentroFormacion/:idcentro_formacion', validarTokenMiddleware, sedeFormacionController.getSedesPorCentroFormacion )
router.put('api/sedeFormacion/:idSedeFormacion/desasignar', validarTokenMiddleware, sedeFormacionController.desasignarSedeController);


module.exports = router;