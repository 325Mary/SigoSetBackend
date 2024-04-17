const express = require('express');
const router = express.Router();
const ObligacionesContratistaController = require('../controller/obligacionesContratistaController');

router.get('/todasobligaciones', ObligacionesContratistaController.findAll);
router.get('/obligacionporid', ObligacionesContratistaController.findById);
router.post('/crearobligacion', ObligacionesContratistaController.create);
router.put('/actualizarobligaciones', ObligacionesContratistaController.update);
router.delete('/eliminarobligacion', ObligacionesContratistaController.deleteById);

module.exports = router;