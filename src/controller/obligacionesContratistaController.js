const { ResponseStructure } = require('../helpers/ResponseStructure');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');
const { 
  crearObligacionesContratista,
  obtenerObligacionesContratista,
  editarObligacionesContratista,
  eliminarObligacionesContratista 
} = require('../services/obligacionesContratistaService');
const { findOneObligacionContratista, findObligacionContratistaById } = require('../models/obligacionesContratistaModel');
const controller = {};

controller.crearObligacionesContratistaC = async (req, res, next) => {
  try {
    validarCamposRequeridos(['obligacion_contratista'])(req, res, async () => {
      const obligacionesContratistaData = req.body;

      const obligacionContratistaoExistente = await findOneObligacionContratista(obligacionesContratistaData.obligacion_contratista);
      if (obligacionContratistaoExistente) {
        return res.status(400).json({ ...ResponseStructure, status: 400, message: 'obligacion de contratista ya está registrada' });
      }
      const obligacionContratista = await crearObligacionesContratista(obligacionesContratistaData);
      res.status(201).json({ ...ResponseStructure, message: 'obligacion de contratista creada exitosamente', data: obligacionContratista });
    });
  } catch (error) {
    next(error);
  }
};

controller.obtenerObligacionesContratistaC = async (req, res, next) => {
  try {
    const listObligacionesContratista = await obtenerObligacionesContratista();
    res.status(200).json({ ...ResponseStructure, data: listObligacionesContratista });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se obtuvieron las Obligaciones de contratista' });
  }
};

controller.obtenerObligacionContratistaCID = async (req, res, next) => {
  try {
    const idobligaciones_contratista = req.params.idobligaciones_contratista;
    const obligacionContratista = await findObligacionContratistaById(idobligaciones_contratista);

    if (!obligacionContratista) {
      return res.status(404).json({ ...ResponseStructure, status: 404, message: 'No se encontró ninguna obligacion contratista con el ID proporcionado' });
    }

    res.status(200).json({ ...ResponseStructure, data: obligacionContratista });
  } catch (error) {
    next(error);
  }
};

controller.editarObligacionesContratistaC = async (req, res, next) => {
  try {
    const idobligaciones_contratista = req.params.idobligaciones_contratista;
    const nuevaObligacionContratistaData = req.body;

    if (Object.keys(nuevaObligacionContratistaData).length === 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud está vacío' });
    }

    const camposValidos = ['obligacion_contratista'];
    const camposRecibidos = Object.keys(nuevaObligacionContratistaData);
    const camposInvalidos = camposRecibidos.filter(field => !camposValidos.includes(field));

    if (camposInvalidos.length > 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud contiene campos no válidos', invalidFields: camposInvalidos });
    }

    const obligacionContratistaActualizado = await editarObligacionesContratista(idobligaciones_contratista, nuevaObligacionContratistaData);
    res.status(200).json({ ...ResponseStructure, message: 'obligacion contratista actualizada exitosamente', data: obligacionContratistaActualizado });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: `No se actualizó ninguna obligacion contratista con el ID ${req.params.idobligaciones_contratista} proporcionado` });
  }
};

controller.eliminarObligacionesContratistaC = async (req, res, next) => {
  try {
    const idobligaciones_contratista = req.params.idobligaciones_contratista;
    await eliminarObligacionesContratista(idobligaciones_contratista);
    res.status(200).json({ ...ResponseStructure, message: 'obligacion contratista eliminada exitosamente' });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ningúna obligacion contratista con el ID ${req.params.idobligaciones_contratista} proporcionado` });
  }
};

module.exports = controller;
