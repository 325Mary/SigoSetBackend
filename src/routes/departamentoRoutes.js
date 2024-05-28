// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {
    crearDepartamentoC,
    obtenerDepartamentoC,
    editarDepartamentoC,
    eliminarDepartamentoC,
    obtenerDepartamentoPorId
     } = require('../controller/departamentoController');

router.post('/crearDepartamento', crearDepartamentoC); 
router.get('/listMDepartamento', obtenerDepartamentoC);
//router.get('/listarOneDep/:iddepartamento',obtenerDepartamentoPorId)
router.put('/editDepartamento/:iddepartamento', editarDepartamentoC);
router.delete('/EliminarDepartamento/:iddepartamento', eliminarDepartamentoC);


module.exports = router;
