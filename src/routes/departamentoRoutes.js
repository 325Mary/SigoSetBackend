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

router.post('/crearDepartamento', validarTokenMiddleware, crearDepartamentoC); 
router.get('/listMDepartamento', validarTokenMiddleware, obtenerDepartamentoC);
//router.get('/listarOneDep/:iddepartamento',obtenerDepartamentoPorId)
router.put('/editDepartamento/:iddepartamento', validarTokenMiddleware,  editarDepartamentoC);
router.delete('/EliminarDepartamento/:iddepartamento', validarTokenMiddleware, eliminarDepartamentoC);


module.exports = router;
