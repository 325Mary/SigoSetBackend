 // routes/usuarioRoutes.js
 const express = require('express');
 const router = express.Router();
 const {
    crearPuestosTemporalesController,
    editarPuestosTemporalesfC,
    eliminarPuestosTemporalesfC,
    obtenerPuestosTemporalesController
      } = require('../controller/puestosTemporalesController');
 
 router.post('/crearPuestosTemporales', crearPuestosTemporalesController); 
 router.get('/listPuestosTemporales/:idcentro_formacion', obtenerPuestosTemporalesController);
 router.put('/editPuestosTemporales/:idPuestosTemporales', editarPuestosTemporalesfC);
 router.delete('/EliminarPuestosTemporales/:idPuestosTemporales', eliminarPuestosTemporalesfC);
 
 
 module.exports = router;
 