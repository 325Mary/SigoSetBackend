// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {crearUsuarioC, obtenerUsuariosC} = require('../controller/usuario.controller');

router.post('/crearUsuario', crearUsuarioC); // Ruta para crear un nuevo usuario
router.get('/usuarios', obtenerUsuariosC);

module.exports = router;
