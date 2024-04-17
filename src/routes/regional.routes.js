const express = require('express');
const router = express.Router();
const {
    getAllRegionals,
    createRegional,
    getRegionalById,
    updateRegional,
    deleteRegionalById

} = require('../controller/regional.controller');

router.get('/listAllRegional', getAllRegionals);

router.get('/listRegionalByid/:id', getRegionalById);

router.post('/createRegional', createRegional);

router.put('/editRegionalByid/:id', updateRegional);

router.delete('/deleteRegionalByid/:id', deleteRegionalById);

module.exports = router;