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

 router.post('/api/crearPuestosTemporales', validarTokenMiddleware, crearPuestosTemporalesController); 
 router.get('/api/listPuestosTemporales/:idcentro_formacion', validarTokenMiddleware,  obtenerPuestosTemporalesController);
 router.put('/api/editPuestosTemporales/:idPuestosTemporales', validarTokenMiddleware, editarPuestosTemporalesfC);
 router.delete('/api/EliminarPuestosTemporales/:idPuestosTemporales', validarTokenMiddleware,  eliminarPuestosTemporalesfC);
 
 
 module.exports = router;
 