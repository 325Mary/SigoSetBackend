const router = require('express').Router();
const sedeFormacionController = require('../controller/sedeFormacion.controller')
const {validateSedeFormacionMiddleware} = require('../middleware/sedeFormacion/validarSedeFormacion.middleware')

router.get('/sedesFormacion',sedeFormacionController.getSedesFormacion)
router.get('/sedeFormacion/:idSedeFormacion',sedeFormacionController.getSedeFormacion )
router.post('/sedeFormacion',validateSedeFormacionMiddleware,sedeFormacionController.crearSedeFormacion )
router.put('/sedeFormacion/:idSedeFormacion',sedeFormacionController.editarSedeFormacion )
router.delete('/sedeFormacion/:idSedeFormacion',sedeFormacionController.eliminarSedeFormacion )
module.exports = router;