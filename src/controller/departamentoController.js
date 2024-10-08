const { ResponseStructure } = require('../helpers/ResponseStructure');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');
const {crearDepartamento,
    obtenerDepartamentos,
    editarDepartamento,
    eliminarDepartamento } = require('../services/departamentoService');
const {findOneDepartamento, update} = require('../models/departamentosModel')
const controller = {}

controller.crearDepartamentoC = async (req, res, next) => {
  try {
    validarCamposRequeridos(['departamento'])(req, res, async () => {
      const departamentoData = req.body;

      const departamentoExistente= await findOneDepartamento(departamentoData.departamento);
      if(departamentoExistente){
      return res.status(400).json({ ...ResponseStructure, status: 400, message: 'El Departamento  ya está registrado' });
      }
      const departamento = await crearDepartamento(departamentoData);
      res.status(201).json({ ...ResponseStructure, message: 'Departamento creado exitosamente', data: departamento });
    });
  } catch (error) {
    next(error);
  }
};

controller.obtenerDepartamentoC = async (req, res, next) => {
  try {
    const listDepartamento = await obtenerDepartamentos();
    res.status(200).json({ ...ResponseStructure, data: listDepartamento });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se obtuvieron los Departamento' });
  }
};

controller.editarDepartamentoC = async (req, res, next) => {
  const iddepartamento = req.params.iddepartamento;
  const DepartamentoData = req.body;
  try {
      const updatedDepartamento = await update(iddepartamento, DepartamentoData);
      res.json(updatedDepartamento);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el departamento' });
  }
};


controller.eliminarDepartamentoC = async (req, res, next) => {
  try {
    const iddepartamento = req.params.iddepartamento;
    await eliminarDepartamento(iddepartamento);
    res.status(200).json({ ...ResponseStructure, message: 'Departamento eliminado exitosamente' });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ningún Departamento con el ID ${req.params.iddepartamento} proporcionado` });
  }
};

module.exports = controller;
