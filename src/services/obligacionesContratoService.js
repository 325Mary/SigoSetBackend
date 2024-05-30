const ObligacionesContratoModel = require('../models/obligacionesContratoModel');

const verTodoObligaciones = async() => {
    try {
        const obligaciones = await ObligacionesContratoModel.findAll();
        return obligaciones;
    } catch (error) {
        throw error;
    }
};

const crearObligacionesContrato = async(obligaciones_contratoData) => {
    try {
        const result = await ObligacionesContratoModel.create(obligaciones_contratoData);
        return result;
    } catch (error) {
        throw error;
    }
};

const verObligacionesContratoPorId = async(id) => {
    try {
        const obligaciones = await ObligacionesContratoModel.findById(id);
        return obligaciones;
    } catch (error) {
        throw error;
    }
};

const actualizarObligacionesContrato = async(id, obligaciones_contratoData) => {
    try {
        const result = await ObligacionesContratoModel.update(id, obligaciones_contratoData);
        return result;
    } catch (error) {
        throw error;
    }
};

const eliminarObligacionesContratoPorId = async(id) => {
    try {
        const result = await ObligacionesContratoModel.deleteById(id);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    verTodoObligaciones,
    crearObligacionesContrato,
    verObligacionesContratoPorId,
    actualizarObligacionesContrato,
    eliminarObligacionesContratoPorId
};