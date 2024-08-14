//centro de formacion
const router = require('express').Router();
const centrosFormacionController = require('../controller/centroFormacionController')
const validarTokenMiddleware = require('../middleware/userAuthentication')

router.get('/centrosFormacion',validarTokenMiddleware, centrosFormacionController.getCentrosFormacion )
router.get('/centroFormacion/:idcentroFormacion', validarTokenMiddleware, centrosFormacionController.getCentroFormacion )
router.post('/centroFormacion', validarTokenMiddleware, centrosFormacionController.crearCentroFormacion )
router.put('/centroFormacion/:idcentroFormacion', validarTokenMiddleware, centrosFormacionController.editarCentroFormacion )
router.delete('/centroFormacion/:idcentroFormacion', validarTokenMiddleware, centrosFormacionController.eliminarCentroFormacion )
module.exports = router;
