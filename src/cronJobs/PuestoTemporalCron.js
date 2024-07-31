const cron = require('node-cron');
const { verificarVigenciPuestos } = require('../services/PuestosTemporalesService');

cron.schedule('* * * * *', verificarVigenciPuestos);

module.exports = cron;
