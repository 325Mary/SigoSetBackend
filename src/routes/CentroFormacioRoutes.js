//centro de formacion
const router = require('express').Router();
const centrosFormacionController = require('../controller/centroFormacionController')
router.get('/centrosFormacion', centrosFormacionController.getCentrosFormacion )
router.get('/centroFormacion/:idCentroFormacion', centrosFormacionController.getCentroFormacion )
router.post('/centroFormacion', centrosFormacionController.crearCentroFormacion )
router.put('/centroFormacion/:idCentroFormacion', centrosFormacionController.editarCentroFormacion )
router.delete('/centroFormacion/:idCentroFormacion', centrosFormacionController.eliminarCentroFormacion )
module.exports = router;
