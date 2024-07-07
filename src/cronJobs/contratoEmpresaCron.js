const cron = require('node-cron');
const { verificarVigenciaContratos } = require('../services/contratoEmpresaService');

cron.schedule('* * * * *', verificarVigenciaContratos);

module.exports = cron;
