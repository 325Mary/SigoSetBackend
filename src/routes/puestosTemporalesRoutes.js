 // routes/usuarioRoutes.js
 const express = require('express');
 const router = express.Router();
 const {
    crearPuestosTemporalesController,
    editarPuestosTemporalesfC,
    eliminarPuestosTemporalesfC,
    obtenerPuestosTemporalesController
      } = require('../controller/puestosTemporalesController');
  const  validarTokenMiddleware= require('../middleware/userAuthentication')

 router.post('/crearPuestosTemporales', validarTokenMiddleware, crearPuestosTemporalesController); 
 router.get('/listPuestosTemporales/:idcentro_formacion', validarTokenMiddleware,  obtenerPuestosTemporalesController);
 router.put('/editPuestosTemporales/:idPuestosTemporales', validarTokenMiddleware, editarPuestosTemporalesfC);
 router.delete('/EliminarPuestosTemporales/:idPuestosTemporales', validarTokenMiddleware,  eliminarPuestosTemporalesfC);
 
 
 module.exports = router;
 