const { ResponseStructure } = require('../helpers/ResponseStructure');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');
const {  crearDetalleContrato,
    obtenerDetallesdeContrato,
    editarDetalleContrato,
    obtenerDetalleContratoPorId,
    eliminarDetalleContrato,
    obtenerDetalleContratoPorNombre} = require('../services/detalleContratoService');
const controller = {}

controller.crearDetalleContratoC = async (req, res, next) => {
  try {
    validarCamposRequeridos(['idcertificacion_centrof', 'nombreDetalleContrato'])(req, res, async () => {
      const detalle_contratoData = {
        idcertificacion_centrof: req.body.idcertificacion_centrof,
        idobligaciones_contrato: req.body.idobligaciones_contrato,
        cumple: req.body.cumple,
        nombreDetalleContrato: req.body.nombreDetalleContrato,
        descripcionVHumana: req.body.descripcionVHumana || null,
        cantidad_puestov: req.body.cantidad_puestov || null,
        direccionSedeVHumana: req.body.direccionSedeVHumana || null,
        total: req.body.total || null,
        descripcion: req.body.descripcion || null,
        cantidad: req.body.cantidad || null,
        direccionSedeVElectronica: req.body.direccionSedeVElectronica || null,
        totalE: req.body.totalE || null,
        observaciones1: req.body.observaciones1 || null,
        observaciones2: req.body.observaciones2 || null,
        fechaCreacion: req.body.fechaCreacion || null,
        firma_usuario: req.body.firma_usuario || null,
        Sede_formacion: req.body.Sede_formacion || null
      };

      const nuevoDetalleContrato = await crearDetalleContrato(detalle_contratoData);
      res.status(201).json({ ...ResponseStructure, message: 'Detalle contrato creado exitosamente', data: nuevoDetalleContrato });
    });
  } catch (error) {
    next(error);
  }
}



controller.obtenerdetalleContratosC = async (req, res, next) => {
  try {
    const idperfil = req.user.idperfil;
    const idcentro_formacion = req.user.idcentro_formacion;

    const listDetalleContratos = await obtenerDetallesdeContrato(idperfil, idcentro_formacion);
    res.status(200).json({ ...ResponseStructure, data: listDetalleContratos });
  } catch (error) {
    next(error);
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
    const camposValidos = [
      'iddetalle_contrato',
      'idcertificacion_centrof', 'idobligaciones_contrato', 'cumple', 'nombreDetalleContrato', 
      'descripcionVHumana', 'cantidad_puestov', 'direccionSedeVHumana', 'total', 'descripcion', 
      'cantidad', 'direccionSedeVElectronica', 'totalE', 'observaciones1', 'observaciones2', 'fechaCreacion'
    ];

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

controller.obtenerDetalleContratoPorIdC = async (req, res, next) => {
  try {
    const iddetalle_contrato = req.params.iddetalle_contrato;

    // Llamar al servicio para obtener el detalle de contrato por ID
    const detalleContrato = await obtenerDetalleContratoPorId(iddetalle_contrato);

    if (!detalleContrato) {
      return res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ningún detalle de contrato con el ID ${iddetalle_contrato}` });
    }

    res.status(200).json({ ...ResponseStructure, data: detalleContrato });
  } catch (error) {
    res.status(500).json({ ...ResponseStructure, status: 500, error: 'Error al obtener el detalle de contrato', message: error.message });
  }
}

controller.obtenerDetalleContratoPorNombreC = async (req, res, next) => {
  try {
    const nombreDetalleContrato = req.params.nombreDetalleContrato;

    // Llamar al servicio para obtener el detalle de contrato por nombre
    const detalleContrato = await obtenerDetalleContratoPorNombre(nombreDetalleContrato);

    if (!detalleContrato) {
      return res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ningún detalle de contrato con el nombre ${nombreDetalleContrato}` });
    }

    res.status(200).json({ ...ResponseStructure, data: detalleContrato });
  } catch (error) {
    res.status(500).json({ ...ResponseStructure, status: 500, error: 'Error al obtener el detalle de contrato', message: error.message });
  }
}

module.exports = controller;
