const { ResponseStructure } = require('../helpers/ResponseStructure');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');
const { crearContratoEmpresa,
  obtenerContratoEmpresas,
  editarContratoEmpresa,
  eliminarContratoEmpresa} = require('../services/contratoEmpresaService');
  const {
    findOneContratoEmpres
   } = require('../models/contratoEmpresaModel');
const controller = {}

controller.crearContratoEmpresaC = async (req, res, next) => {
  try {
    
    validarCamposRequeridos(['idempresa','descripcion_contrato', 'fecha_inicio', 'fecha_fin'])(req, res, async () => {
      const contratoEmpresaData = req.body;
      if (req.file) {
        contratoEmpresaData.contrato_pdf = req.file.filename;
      }
     
      const contrato_empresaExistente = await findOneContratoEmpres(contratoEmpresaData.descripcion_contrato);
      if(contrato_empresaExistente){
      return res.status(400).json({ ...ResponseStructure, status: 400, message: ' ya está registrado' });
      }
      const contratoEmpresa = await crearContratoEmpresa(contratoEmpresaData);
      res.status(201).json({ ...ResponseStructure, message: 'contrato Empresa creado exitosamente', data: contratoEmpresa });
    });
  } catch (error) {
    next(error);
  }
};

controller.obtenerContratoEmpresasC = async (req, res, next) => {
  try {
    const idperfil = req.user.idperfil;
    const emailUsuario = req.user.email_usuario;

    console.log("idperfil:", idperfil);
    console.log("emailUsuario:", emailUsuario);

    const listContratoEmpresas = await obtenerContratoEmpresas(idperfil, emailUsuario);

    if (listContratoEmpresas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron contratos para el usuario actual' });
    }

    res.status(200).json({ message: 'Lista de contratos obtenida correctamente', data: listContratoEmpresas });
  } catch (error) {
    console.error("Error al obtener contratos:", error);
    res.status(500).json({ error: 'Error al obtener contratos' });
  }
};


controller.editarContratoEmpresaC = async (req, res, next) => {
  try {
    const idContrato_empresa = req.params.idContrato_empresa;
    const nuevoContratoEmpresaData = req.body;

    if (req.file) {
      nuevoContratoEmpresaData.contrato_pdf = req.file.filename;
    }

    if (Object.keys(nuevoContratoEmpresaData).length === 0 && !contrato_pdf) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud está vacío' });
    }


    // Definir los campos válidos esperados
    const camposValidos = ['idempresa','descripcion_contrato', 'fecha_inicio', 'fecha_fin', 'contrato_pdf'];

    // Verificar si todos los campos recibidos están en la lista de campos válidos
    const camposRecibidos = Object.keys(nuevoContratoEmpresaData);
    const camposInvalidos = camposRecibidos.filter(field => !camposValidos.includes(field));

    if (camposInvalidos.length > 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud contiene campos no válidos', invalidFields: camposInvalidos });
    }

    const contratoEmpresaActualizado = await editarContratoEmpresa(idContrato_empresa, nuevoContratoEmpresaData);
    res.status(200).json({ ...ResponseStructure, message: 'contrato empresa actualizado exitosamente', data: contratoEmpresaActualizado });
  } catch (error) {
    // res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se actualizó ningún contrato empresa con el ID proporcionado' });
  console.log(error);
  }
};

controller.eliminarContratoEmpresaC = async (req, res, next) => {
  try {
    const idContrato_empresa= req.params.idContrato_empresa;
    await eliminarContratoEmpresa(idContrato_empresa);
    res.status(200).json({ ...ResponseStructure, message: 'contrato empresa eliminado exitosamente' });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ningún contrato empresa con el ID ${req.params.idContrato_empresa} proporcionado` });
  }
};

module.exports = controller;
