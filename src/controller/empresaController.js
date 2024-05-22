const { ResponseStructure } = require('../helpers/ResponseStructure');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');
const { crearEmpresa,
    obtenerEmpresas,
    editarEmpresa,
    eliminarEmpresa } = require('../services/empresaService');

const {findNit} = require('../models/empresaModel')
const controller = {}

controller.crearEmpresaC = async (req, res, next) => {
  try {
    validarCamposRequeridos(['nombre_empresa', 'nit_empresa', 'direccion_empresa', 'telefono_empresa', 'email_empresa', 'representante_legal', 'telefono_representantel', 'email_representantel', 'persona_contacto', 'telefono_personac', 'email_personac'])(req, res, async () => {
        const empresaData = req.body;

      const empresaExistente= await findNit(empresaData.nit_empresa);
      if(empresaExistente){
      return res.status(400).json({ ...ResponseStructure, status: 400, message: 'EL NIT que has asignado se encuentra registrado' });
      }
      const empresa = await crearEmpresa(empresaData);
      res.status(201).json({ ...ResponseStructure, message: 'Empresa creada exitosamente', data: empresa });
    });
  } catch (error) {
    next(error);
  }
};

controller.obtenerEmpresaC = async (req, res, next) => {
  try {
    const listEmpresas = await obtenerEmpresas();
    res.status(200).json({ ...ResponseStructure, data: listEmpresas });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se obtuvieron las empresas' });
  }
};

controller.editarEmpresaC = async (req, res, next) => {
  try {
    const idempresa = req.params.idempresa;
    const nuevaEmpresaData = req.body;

    // Verificar si el cuerpo de la solicitud está vacío
    if (Object.keys(nuevaEmpresaData).length === 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud está vacío' });
    }

    // Definir los campos válidos esperados
    const camposValidos = ['nombre_empresa', 'nit_empresa', 'direccion_empresa', 'telefono_empresa', 'email_empresa', 'representante_legal', 'telefono_representantel', 'email_representantel', 'persona_contacto', 'telefono_personac', 'email_personac'];

    // Verificar si todos los campos recibidos están en la lista de campos válidos
    const camposRecibidos = Object.keys(nuevaEmpresaData);
    const camposInvalidos = camposRecibidos.filter(field => !camposValidos.includes(field));

    if (camposInvalidos.length > 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud contiene campos no válidos', invalidFields: camposInvalidos });
    }

    const empresaActualizada = await editarEmpresa(idempresa, nuevaEmpresaData);
    res.status(200).json({ ...ResponseStructure, message: 'Empresa actualizado exitosamente', data: empresaActualizada });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se actualizó ningúna empresa con el ID proporcionado' });
  }
};

controller.eliminarEmpresaC = async (req, res, next) => {
  try {
    const idempresa = req.params.idempresa;
    await eliminarEmpresa(idempresa);
    res.status(200).json({ ...ResponseStructure, message: 'Empresa eliminado exitosamente' });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ninguna empresa con el ID ${req.params.idempresa} proporcionado` });
  }
};

module.exports = controller;
