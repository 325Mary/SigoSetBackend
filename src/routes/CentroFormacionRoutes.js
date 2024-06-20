//centro de formacion
const router = require('express').Router();
const centrosFormacionController = require('../controller/centroFormacionController')

router.get('/centrosFormacion', centrosFormacionController.getCentrosFormacion )
router.get('/centroFormacion/:idcentroFormacion', centrosFormacionController.getCentroFormacion )
router.post('/centroFormacion', centrosFormacionController.crearCentroFormacion )
router.put('/centroFormacion/:idcentroFormacion', centrosFormacionController.editarCentroFormacion )
router.delete('/centroFormacion/:idcentroFormacion', centrosFormacionController.eliminarCentroFormacion )
module.exports = router;
