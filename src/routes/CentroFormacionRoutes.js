//centro de formacion
const router = require('express').Router();
const centrosFormacionController = require('../controller/centroFormacionController')
const validarTokenMiddleware = require('../middleware/userAuthentication')

router.get('/api/centrosFormacion',validarTokenMiddleware, centrosFormacionController.getCentrosFormacion )
router.get('/api/centroFormacion/:idcentroFormacion', validarTokenMiddleware, centrosFormacionController.getCentroFormacion )
router.post('/api/centroFormacion', validarTokenMiddleware, centrosFormacionController.crearCentroFormacion )
router.put('/api/centroFormacion/:idcentroFormacion', validarTokenMiddleware, centrosFormacionController.editarCentroFormacion )
router.delete('/api/centroFormacion/:idcentroFormacion', validarTokenMiddleware, centrosFormacionController.eliminarCentroFormacion )
module.exports = router;
