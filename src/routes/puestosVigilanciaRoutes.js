// const express = require('express');
// const router = express.Router();
// const controller = require('../controller/puestosVigilanciaController');

// router.post('/crear', controller.crearPuestoVigC);
// router.get('/', controller.obtenerPuestosVigC);
// router.get('/verPorIdPuestoVig', controller.getPuestoVigByIdC);
// router.put('/editarPorIdPuestoVig', controller.editarPuestoVigC);
// router.delete('/eliminarPorIdPuestoVig', controller.eliminarPuestoVigC);

// module.exports = router;
// routes/puestoVigilanciaRoutes.js
const express = require('express');
const router = express.Router();
const puestoVigilanciaController = require('../controller/puestosVigilanciaController');

router.get('/optenertodospuestosvig', puestoVigilanciaController.obtenerPuestosC);
router.get('/obtenerpuestovigporid', puestoVigilanciaController.obtenerPuestoPorIdC);
router.post('/crearpuestovig', puestoVigilanciaController.crearPuestoC);
router.put('/editarpuestovig', puestoVigilanciaController.editarPuestoC);
router.delete('/eliminarpuestovig', puestoVigilanciaController.eliminarPuestoC);

module.exports = router;