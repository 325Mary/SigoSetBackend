const { ResponseStructure } = require('../helpers/ResponseStructure');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');
const { crearVigilanciaElectronica,
    obtenerVigilanciaElectronicas,
    editarVigilanciaElectronica,
    eliminarVigilanciaElectronica } = require('../services/vigilanciaElectronicaService');
const {findOneVigilanciaElectronica} = require('../models/vigilanciaElectronicaModel')
const controller = {}

controller.crearVigilanciaElectronicaC = async (req, res, next) => {
  try {
    validarCamposRequeridos(['descripcion', 'tarifa'])(req, res, async () => {
      const VigilanciaElectronicaData = req.body;

      const VigilanciaElectronicaExistente= await findOneVigilanciaElectronica(VigilanciaElectronicaData.descripcion);
      if(VigilanciaElectronicaExistente){
      return res.status(400).json({ ...ResponseStructure, status: 400, message: '  ya está registrado' });
      }
      const VigilanciaElectronica = await crearVigilanciaElectronica(VigilanciaElectronicaData);
      res.status(201).json({ ...ResponseStructure, message: ' creado exitosamente', data: VigilanciaElectronica });
    });
  } catch (error) {
    next(error);
  }
};

controller.obtenerVigilanciaElectronicaC = async (req, res, next) => {
  try {
    const listVigilanciaElectronicas = await obtenerVigilanciaElectronicas();
    res.status(200).json({ ...ResponseStructure, data: listVigilanciaElectronicas });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se fue posible realizar la consulta' });
  }
};

controller.editarVigilanciaElectronicaC = async (req, res, next) => {
  try {
    const idvigilancia_electronica = req.params.idvigilancia_electronica;
    const VigilanciaElectronicaData = req.body;

    // Verificar si el cuerpo de la solicitud está vacío
    if (Object.keys(VigilanciaElectronicaData).length === 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud está vacío' });
    }

    const VigilanciaElectronicaActualizado = await editarVigilanciaElectronica(idvigilancia_electronica, VigilanciaElectronicaData);
    res.status(200).json({ ...ResponseStructure, message: 'actualizado exitosamente', data: VigilanciaElectronicaActualizado });
  } catch (error) {
    next(error);
  }
};

controller.eliminarVigilanciaElectronicaC = async (req, res, next) => {
  try {
    const idvigilancia_electronica = req.params.idvigilancia_electronica;
    await eliminarVigilanciaElectronica(idvigilancia_electronica);
    res.status(200).json({ ...ResponseStructure, message: ' eliminado exitosamente' });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ningúno con el ID ${req.params.idvigilancia_electronica} proporcionado` });
  }
};

module.exports = controller;
