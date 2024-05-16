const express = require('express');
const router = express.Router();
const ModuloController = require('../controller/moduloController');

router.get('/vertodomodulos', ModuloController.findAll);
router.get('/verporidmodulo', ModuloController.findById);
router.post('/crearmodulo', ModuloController.create);
router.put('/editarpormodulo', ModuloController.update);
router.delete('/eliminarmodulo', ModuloController.deleteById);

module.exports = router;