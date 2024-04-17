const express = require('express');
const router = express.Router();
const ModuloXPerfilController = require('../controller/moduloxperfilController');

router.get('/vertodosmodulosxperfil', ModuloXPerfilController.findAll);
router.get('/vermoduloxidperfil', ModuloXPerfilController.findById);
router.post('/crearmoduloxperfil', ModuloXPerfilController.create);
router.put('/actualizarmoduloxperfil', ModuloXPerfilController.update);
router.delete('/eliminarmoduloxperfil', ModuloXPerfilController.deleteById);

module.exports = router;