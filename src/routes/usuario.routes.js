// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {crearUsuarioC,
     obtenerUsuariosC,
     postLogin,
     editarUsuarioC,
     eliminarUsuarioC} = require('../controller/usuario.controller');


router.post('/crearUsuario', crearUsuarioC); 
router.get('/listUsuarios', obtenerUsuariosC);
router.post('/iniciarSesion', postLogin)
router.put('/editUser/:idUsuario', editarUsuarioC);
router.delete('/EliminarUser/:idUsuario', eliminarUsuarioC);


module.exports = router;
