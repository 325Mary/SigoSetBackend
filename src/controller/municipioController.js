const { ResponseStructure } = require('../helpers/ResponseStructure');
const { crearMunicipio, obtenerMunicipios, obtenerMunicipioPorId, editarMunicipio, eliminarMunicipio, buscarMunicipioPorNombre } = require('../services/municipioService');

const controller = {};

controller.crearMunicipioC = async(req, res, next) => {
    try {
        const municipioData = req.body;
        const municipio = await crearMunicipio(municipioData);
        res.status(201).json({...ResponseStructure, message: 'Municipio creado exitosamente', data: municipio });
    } catch (error) {
        next(error);
    }
};

controller.obtenerMunicipiosC = async(req, res, next) => {
    try {
        const listMunicipios = await obtenerMunicipios();
        res.status(200).json({...ResponseStructure, data: listMunicipios });
    } catch (error) {
        next(error);
    }
};

controller.obtenerMunicipioPorIdC = async(req, res, next) => {
    try {
        const id = req.params.idmunicipio;
        const municipio = await obtenerMunicipioPorId(id);
        res.status(200).json({...ResponseStructure, data: municipio });
    } catch (error) {
        next(error);
    }
};

controller.editarMunicipioC = async(req, res, next) => {
    try {
        const id = req.params.idmunicipio;
        const nuevoMunicipioData = req.body;
        const municipioActualizado = await editarMunicipio(id, nuevoMunicipioData);
        res.status(200).json({...ResponseStructure, message: 'Municipio actualizado exitosamente', data: municipioActualizado });
    } catch (error) {
        next(error);
    }
};

controller.eliminarMunicipioC = async(req, res, next) => {
    try {
        const idmunicipio = req.params.idmunicipio;
        await eliminarMunicipio(idmunicipio);
        res.status(200).json({...ResponseStructure, message: 'Municipio eliminado exitosamente' });
    } catch (error) {
        next(error);
    }
};

module.exports = controller;