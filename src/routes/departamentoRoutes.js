// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {
    crearDepartamentoC,
    obtenerDepartamentoC,
    editarDepartamentoC,
    eliminarDepartamentoC,
    
     } = require('../controller/departamentoController');
const validarTokenMiddleware = require('../middleware/userAuthentication')

router.post('/api/crearDepartamento', validarTokenMiddleware, crearDepartamentoC); 
router.get('/api/listMDepartamento', validarTokenMiddleware, obtenerDepartamentoC);
//router.get('/listarOneDep/:iddepartamento',obtenerDepartamentoPorId)
router.put('/api/editDepartamento/:iddepartamento', validarTokenMiddleware,  editarDepartamentoC);
router.delete('/api/EliminarDepartamento/:iddepartamento', validarTokenMiddleware, eliminarDepartamentoC);


module.exports = router;
