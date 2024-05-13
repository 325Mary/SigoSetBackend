const express = require('express');
const router = express.Router();

const {PuestosVigilancia} = require('../services/PuestosVigilanciaService')

router.get('listPuestosV', PuestosVigilancia)

module.exports = router