// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {
    crearPerfilC,
    obtenerPerfilesC,
    editarPerfilC,
    eliminarPerfilC
     } = require('../controller/perfilController');
const  validarTokenMiddleware= require('../middleware/userAuthentication')

router.post('/crearPerfil', validarTokenMiddleware,  crearPerfilC); 
router.get('/listPerfil', validarTokenMiddleware,  obtenerPerfilesC);
router.put('/editPerfil/:idperfil', validarTokenMiddleware, editarPerfilC);
router.delete('/EliminarPerfil/:idperfil', validarTokenMiddleware, eliminarPerfilC);


module.exports = router;
