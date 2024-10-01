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

router.post('/api/crearUsuario', validarTokenMiddleware, upload.single('firma_usuario'),  crearUsuarioC); 
router.get('/api/listUsuarios', validarTokenMiddleware,  obtenerUsuariosC);
router.post('/api/iniciarSesion', postLogin)
router.put('/api/editUser/:idUsuario', validarTokenMiddleware, upload.single('firma_usuario'), editarUsuarioC);
router.delete('/api/EliminarUser/:idUsuario', validarTokenMiddleware, eliminarUsuarioC);
router.put('/api/cambiarPassword/:idUsuario',validarTokenMiddleware , cambiarContraseñaC);
router.post('/api/solicitarRestablecimiento', solicitarRestablecimiento);
router.post('/api/restablecerPassword', restablecerContraseña);
router.put('/api/estadoUser/:idUsuario' , validarTokenMiddleware, estadoUsuarioC);
router.post('/api/cerrarSesion', cerrarSesionC);
router.get('/api/getId/:idUsuario', validarTokenMiddleware, getUserId);
router.post('/api/enviarCorreo/:idUsuario', validarTokenMiddleware,  enviarDatosUsuarioPorCorreoController);

module.exports = router;
