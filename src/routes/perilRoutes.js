// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {
    crearPerfilC,
    obtenerPerfilesC,
    editarPerfilC,
    eliminarPerfilC
     } = require('../controller/perfilController');

router.post('/crearPerfil', crearPerfilC); 
router.get('/listPerfil', obtenerPerfilesC);
router.put('/editPerfil/:idperfil', editarPerfilC);
router.delete('/EliminarPerfil/:idperfil', eliminarPerfilC);


module.exports = router;
