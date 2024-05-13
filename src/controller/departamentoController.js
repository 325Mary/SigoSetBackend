const { ResponseStructure } = require('../helpers/ResponseStructure');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');
const {crearDepartamento,
    obtenerDepartamentos,
    editarDepartamento,
    eliminarDepartamento } = require('../services/departamentoService');
const {findOneDepartamento} = require('../models/departamentosModel')
const controller = {}

controller.crearDepartamentoC = async (req, res, next) => {
  try {
    validarCamposRequeridos(['departamento'])(req, res, async () => {
      const departamentoData = req.body;

      const departamentoExistente= await findOneMDepartamento(departamentoData.departamento);
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
  try {
    const iddepartamento = req.params.iddepartamento;
    const nuevoDepartamentoData = req.body;

    // Verificar si el cuerpo de la solicitud está vacío
    if (Object.keys(nuevoDepartamentoData).length === 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud está vacío' });
    }

    // Definir los campos válidos esperados
    const camposValidos = ['departamento'];

    // Verificar si todos los campos recibidos están en la lista de campos válidos
    const camposRecibidos = Object.keys(nuevoDepartamentoData);
    const camposInvalidos = camposRecibidos.filter(field => !camposValidos.includes(field));

    if (camposInvalidos.length > 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud contiene campos no válidos', invalidFields: camposInvalidos });
    }

    const DepartamentoActualizado = await editarDepartamento(iddepartamento, nuevoMDepartamentoData);
    res.status(200).json({ ...ResponseStructure, message: 'Departamento actualizado exitosamente', data: DepartamentoActualizado });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se actualizó ningún Departamento con el ID proporcionado' });
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
