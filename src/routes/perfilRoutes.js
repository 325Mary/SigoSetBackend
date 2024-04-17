const express = require('express');
const router = express.Router();
const PerfilController = require('../controller/perfilController');

router.get('/verperfiles', PerfilController.findAll);
router.get('/verperfilporid', PerfilController.findById);
router.post('/crearperfil', PerfilController.create);
router.put('/editarperfil', PerfilController.update);
router.delete('/eliminarperfil', PerfilController.deleteById);

module.exports = router;