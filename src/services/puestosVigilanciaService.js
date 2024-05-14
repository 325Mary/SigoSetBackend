const PuestoVigilancia = require('../models/puestosVigilanciaModel');

const obtenerPuestos = async() => {
    try {
        const puestos = await PuestoVigilancia.findAll();
        return puestos;
    } catch (error) {
        throw error;
    }
};

const obtenerPuestoPorId = async(id) => {
    try {
        const puesto = await PuestoVigilancia.findById(id);
        return puesto;
    } catch (error) {
        throw error;
    }
};

const crearPuesto = async(puestoData) => {
    try {
        const nuevoPuesto = await PuestoVigilancia.create(puestoData);
        return nuevoPuesto;
    } catch (error) {
        throw error;
    }
};

const editarPuesto = async(id, nuevoPuestoData) => {
    try {
        const puestoEditado = await PuestoVigilancia.update(id, nuevoPuestoData);
        return puestoEditado;
    } catch (error) {
        throw error;
    }
};

const eliminarPuesto = async(id) => {
    try {
        await PuestoVigilancia.deleteById(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    obtenerPuestos,
    obtenerPuestoPorId,
    crearPuesto,
    editarPuesto,
    eliminarPuesto
};