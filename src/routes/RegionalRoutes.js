
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

router.get('/api/listAllRegional',validarTokenMiddleware, getAllRegionals);

router.get('/api/listRegionalByid/:id', validarTokenMiddleware,  getRegionalById);

router.post('/api/createRegional', validarTokenMiddleware,  createRegional);

router.put('/api/editRegionalByid/:id', validarTokenMiddleware, updateRegional);

router.delete('/api/deleteRegionalByid/:id', validarTokenMiddleware, deleteRegionalById);

module.exports = router;