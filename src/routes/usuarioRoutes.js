// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {crearUsuarioC,
     obtenerUsuariosC,
     postLogin,
     editarUsuarioC,
     eliminarUsuarioC,
     cambiarContraseñaC,
     solicitarRestablecimiento,
      restablecerContraseña,
      estadoUsuarioC,
      cerrarSesionC,
      getUserId,
      enviarDatosUsuarioPorCorreoController
     } = require('../controller/usuarioController');
const checkPerfil = require('../middleware/verificadorDePerfil')
const  validarTokenMiddleware= require('../middleware/userAuthentication')

const upload = require('../middleware/Multer')

router.post('/crearUsuario', validarTokenMiddleware, upload.single('firma_usuario'),  crearUsuarioC); 
router.get('/listUsuarios', validarTokenMiddleware,  obtenerUsuariosC);
router.post('/iniciarSesion', postLogin)
router.put('/editUser/:idUsuario', validarTokenMiddleware, upload.single('firma_usuario'), editarUsuarioC);
router.delete('/EliminarUser/:idUsuario', validarTokenMiddleware, eliminarUsuarioC);
router.put('/cambiarPassword/:idUsuario',validarTokenMiddleware , cambiarContraseñaC);
router.post('/solicitarRestablecimiento',validarTokenMiddleware, solicitarRestablecimiento);
router.post('/restablecerPassword', validarTokenMiddleware, restablecerContraseña);
router.put('/estadoUser/:idUsuario' , validarTokenMiddleware, estadoUsuarioC);
router.post('/cerrarSesion', cerrarSesionC);
router.get('/getId/:idUsuario', validarTokenMiddleware, getUserId);
router.post('/enviarCorreo/:idUsuario', validarTokenMiddleware,  enviarDatosUsuarioPorCorreoController);

module.exports = router;
