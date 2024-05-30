const { ResponseStructure } = require('../helpers/ResponseStructure');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');
const {  crearDetalleContrato,
    obtenerDetallesdeContrato,
    editarDetalleContrato,
    eliminarDetalleContrato} = require('../services/detalleContratoService');
const controller = {}

controller.crearDetalleContratoC = async (req, res, next) => {
  try {
    validarCamposRequeridos(['dcertificacion_centrof', 'idobligaciones_contrato', 'cumple'])(req, res, async () => {
      const detalle_contratoData = req.body;

    //   const detalleContratoExistente= await findOneDetalleContrato(detalle_contratoData.cumple);
    //   if(detalleContratoExistente){
    //   return res.status(400).json({ ...ResponseStructure, status: 400, message: 'El detalle contrato  ya está registrado' });
    //   }
      const detalleContrato = await crearDetalleContrato(detalle_contratoData);
      res.status(201).json({ ...ResponseStructure, message: 'detalle contrato creado exitosamente', data: detalle_contratoData });
    });
  } catch (error) {
    next(error);
  }
};

controller.obtenerdetalleContratosC = async (req, res, next) => {
  try {
    const listDetalleContratos = await obtenerDetallesdeContrato();
    res.status(200).json({ ...ResponseStructure, data: listDetalleContratos });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se obtuvieron los detalle de contratos' });
  }
};

controller.editarDetalleContratosC = async (req, res, next) => {
  try {
    const iddetalle_contrato = req.params.iddetalle_contrato;
    const nuevoDetalleContratoData = req.body;

    // Verificar si el cuerpo de la solicitud está vacío
    if (Object.keys(nuevoDetalleContratoData).length === 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud está vacío' });
    }

    // Definir los campos válidos esperados
    const camposValidos = ['dcertificacion_centrof', 'idobligaciones_contrato', 'cumple'];

    // Verificar si todos los campos recibidos están en la lista de campos válidos
    const camposRecibidos = Object.keys(nuevoDetalleContratoData);
    const camposInvalidos = camposRecibidos.filter(field => !camposValidos.includes(field));

    if (camposInvalidos.length > 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud contiene campos no válidos', invalidFields: camposInvalidos });
    }

    const detalleContratoActualizado = await editarDetalleContrato(iddetalle_contrato, nuevoDetalleContratoData);
    res.status(200).json({ ...ResponseStructure, message: 'Detalle de contrato actualizado exitosamente', data: detalleContratoActualizado });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se actualizó ningún detalle de contrato con el ID proporcionado' });
  }
};

controller.eliminardetalleContratoC = async (req, res, next) => {
  try {
    const iddetalle_contrato = req.params.iddetalle_contrato;
    await eliminarDetalleContrato(iddetalle_contrato);
    res.status(200).json({ ...ResponseStructure, message: 'Detalle de contrato eliminado exitosamente' });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ningún detalle de contrato con el ID ${req.params.iddetalle_contrato} proporcionado` });
  }
};

module.exports = controller;
