const Municipio = require('../models/municipioModel');

async function crearMunicipio(municipioData) {
    try {
        const nuevoMunicipio = await Municipio.create(municipioData);
        return nuevoMunicipio;
    } catch (error) {
        throw error;
    }
}

async function obtenerMunicipios() {
    try {
        const municipios = await Municipio.findAll();
        return municipios;
    } catch (error) {
        throw error;
    }
}

async function obtenerMunicipioPorId(id) {
    try {
        const municipio = await Municipio.findById(id);
        return municipio;
    } catch (error) {
        throw error;
    }
}

async function editarMunicipio(id, nuevoMunicipioData) {
    try {
        const municipioActualizado = await Municipio.update(id, nuevoMunicipioData);
        return municipioActualizado;
    } catch (error) {
        throw error;
    }
}

async function eliminarMunicipio(id) {
    try {
        await Municipio.deleteById(id);
        return { message: 'Municipio eliminado exitosamente' };
    } catch (error) {
        throw error;
    }
}

async function buscarMunicipioPorNombre(nombre) {
    try {
        const municipios = await Municipio.searchByName(nombre);
        return municipios;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    crearMunicipio,
    obtenerMunicipios,
    obtenerMunicipioPorId,
    editarMunicipio,
    eliminarMunicipio,
    buscarMunicipioPorNombre
};