const { ResponseStructure } = require('../helpers/ResponseStructure');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');
const { crearContratoEmpresa,
  obtenerContratoEmpresas,
  editarContratoEmpresa,
  eliminarContratoEmpresa} = require('../services/contratoEmpresaService');
const controller = {}

controller.crearContratoEmpresaC = async (req, res, next) => {
  try {
    validarCamposRequeridos(['idempresa_vigilancia', 'fecha_inicio', 'fecha_fin'])(req, res, async () => {
      const contratoEmpresaData = req.body;

    
      const contratoEmpresa = await crearContratoEmpresa(contratoEmpresaData);
      res.status(201).json({ ...ResponseStructure, message: 'contrato Empresa creado exitosamente', data: contratoEmpresa });
    });
  } catch (error) {
    next(error);
  }
};

controller.obtenerContratoEmpresasC = async (req, res, next) => {
  try {
    const listContratoEmpresas = await obtenerContratoEmpresas();
    res.status(200).json({ ...ResponseStructure, data: listContratoEmpresas });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se obtuvieron los contratos de empresas' });
  }
};

controller.editarContratoEmpresaC = async (req, res, next) => {
  try {
    const idContrato_empresav = req.params.idContrato_empresav;
    const nuevoContratoEmpresaData = req.body;

    // Verificar si el cuerpo de la solicitud está vacío
    if (Object.keys(nuevoContratoEmpresaData).length === 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud está vacío' });
    }

    // Definir los campos válidos esperados
    const camposValidos = ['idempresa_vigilancia', 'fecha_inicio', 'fecha_fin'];

    // Verificar si todos los campos recibidos están en la lista de campos válidos
    const camposRecibidos = Object.keys(nuevoContratoEmpresaData);
    const camposInvalidos = camposRecibidos.filter(field => !camposValidos.includes(field));

    if (camposInvalidos.length > 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud contiene campos no válidos', invalidFields: camposInvalidos });
    }

    const contratoEmpresaActualizado = await editarContratoEmpresa(idContrato_empresav, nuevoContratoEmpresaData);
    res.status(200).json({ ...ResponseStructure, message: 'contrato empresa actualizado exitosamente', data: contratoEmpresaActualizado });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se actualizó ningún contrato empresa con el ID proporcionado' });
  }
};

controller.eliminarContratoEmpresaC = async (req, res, next) => {
  try {
    const idContrato_empresav = req.params.idContrato_empresav;
    await eliminarContratoEmpresa(idContrato_empresav);
    res.status(200).json({ ...ResponseStructure, message: 'contrato empresa eliminado exitosamente' });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ningún contrato empresa con el ID ${req.params.idContrato_empresav} proporcionado` });
  }
};

module.exports = controller;
