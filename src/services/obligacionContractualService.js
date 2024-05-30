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

const actualizarObligacionContractualPorId = async(idobligaciones_contractuales, data) => {
    return await ObligacionesContractuales.updateById(idobligaciones_contractuales, data);
};

const eliminarObligacionContractualPorId = async(idobligaciones_contractuales) => {
    return await ObligacionesContractuales.deleteById(idobligaciones_contractuales);
};

module.exports = {
    obtenerObligacionesContractuales,
    obtenerObligacionContractualPorId,
    crearObligacionContractual,
    actualizarObligacionContractualPorId,
    eliminarObligacionContractualPorId
};