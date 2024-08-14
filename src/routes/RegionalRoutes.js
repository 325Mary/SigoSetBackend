
const express = require('express');
const router = express.Router();
const {
    getAllRegionals,
    createRegional,
    getRegionalById,
    updateRegional,
    deleteRegionalById

} = require('../controller/regional.controller');
const  validarTokenMiddleware= require('../middleware/userAuthentication')

router.get('/listAllRegional',validarTokenMiddleware, getAllRegionals);

router.get('/listRegionalByid/:id', validarTokenMiddleware,  getRegionalById);

router.post('/createRegional', validarTokenMiddleware,  createRegional);

router.put('/editRegionalByid/:id', validarTokenMiddleware, updateRegional);

router.delete('/deleteRegionalByid/:id', validarTokenMiddleware, deleteRegionalById);

module.exports = router;