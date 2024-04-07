// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {crearUsuarioC,
     obtenerUsuariosC,
     postLogin,
     editarUsuarioC} = require('../controller/usuario.controller');


router.post('/crearUsuario', crearUsuarioC); 
router.get('/listUsuarios', obtenerUsuariosC);
router.post('/iniciarSesion', postLogin)
router.put('/editUser/:idUsuario', editarUsuarioC);

module.exports = router;
