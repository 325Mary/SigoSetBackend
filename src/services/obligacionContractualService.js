const ObligacionesContractuales = require('../models/obligacionContractualModel');

const obtenerObligacionesContractuales = async() => {
    return await ObligacionesContractuales.getAll();
};

const obtenerObligacionContractualPorId = async(id) => {
    return await ObligacionesContractuales.getById(id);
};

const crearObligacionContractual = async(data) => {
    return await ObligacionesContractuales.create(data);
};

const actualizarObligacionContractualPorId = async(id, data) => {
    return await ObligacionesContractuales.updateById(id, data);
};

const eliminarObligacionContractualPorId = async(id) => {
    return await ObligacionesContractuales.deleteById(id);
};

module.exports = {
    obtenerObligacionesContractuales,
    obtenerObligacionContractualPorId,
    crearObligacionContractual,
    actualizarObligacionContractualPorId,
    eliminarObligacionContractualPorId
};