
const ObligacionesContractuales = require('../models/obligacionContractualModel');

const obtenerObligacionesContractuales = (callback) => {
    ObligacionesContractuales.getAll(callback);
};

const obtenerObligacionContractualPorId = (id, callback) => {
    ObligacionesContractuales.getById(id, callback);
};

const crearObligacionContractual = (data, callback) => {
    ObligacionesContractuales.create(data, callback);
};

const actualizarObligacionContractualPorId = (id, data, callback) => {
    ObligacionesContractuales.updateById(id, data, callback);
};

const eliminarObligacionContractualPorId = (id, callback) => {
    ObligacionesContractuales.deleteById(id, callback);
};

module.exports = {
    obtenerObligacionesContractuales,
    obtenerObligacionContractualPorId,
    crearObligacionContractual,
    actualizarObligacionContractualPorId,
    eliminarObligacionContractualPorId
};
