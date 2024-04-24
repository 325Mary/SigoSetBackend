const { ResponseStructure } = require('../helpers/ResponseStructure');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');
const {crearCertificacionCentrof,
    obtenerCertificacionCentrof,
    editarCertificacionCentrof,
    eliminarCertificacionCentrof } = require('../services/certificacionCentroFService');
const controller = {}

controller.crearCertificacionCentrofC = async (req, res, next) => {
  try {
    validarCamposRequeridos(['idcentro_formacion', 'fecha_inicio', 'fecha_fin'])(req, res, async () => {
      const certificacionCentrofData = req.body;

     
      const CertificacionCentrof = await crearCertificacionCentrof(certificacionCentrofData);
      res.status(201).json({ ...ResponseStructure, message: 'certificado de centro creado exitosamente', data: CertificacionCentrof });
    });
  } catch (error) {
    next(error);
  }
};

controller.obtenerCertificacionCentrofC = async (req, res, next) => {
  try {
    const listCertificacionesCentrof = await obtenerCertificacionCentrof();
    res.status(200).json({ ...ResponseStructure, data: listCertificacionesCentrof });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se obtuvieron los certificados de centros' });
  }
};

controller.editarCertificacionCentrofC = async (req, res, next) => {
    try {
      const idcertificacion_centrof = req.params.idcertificacion_centrof;
      const nuevoCertificacionCentrofData = req.body;
  
      // Verificar si el cuerpo de la solicitud está vacío
      if (Object.keys(nuevoCertificacionCentrofData).length === 0) {
        return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud está vacío' });
      }
  
      // Definir los campos válidos esperados
      const camposValidos = ['idcentro_formacion', 'fecha_inicio', 'fecha_fin'];
  
      // Verificar si todos los campos recibidos están en la lista de campos válidos
      const camposRecibidos = Object.keys(nuevoCertificacionCentrofData);
      const camposInvalidos = camposRecibidos.filter(field => !camposValidos.includes(field));
  
      if (camposInvalidos.length > 0) {
        return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud contiene campos no válidos', invalidFields: camposInvalidos });
      }
  
      const CertificacionCentrof = await editarCertificacionCentrof(idcertificacion_centrof, nuevoCertificacionCentrofData);
      res.status(200).json({ ...ResponseStructure, message: 'certificado de centro actualizado exitosamente', data: CertificacionCentrof });
    } catch (error) {
      res.status(404).json({ ...ResponseStructure, status: 404, error:  `No se encontró ningún certificado de centro con el ID ${req.params.idcertificacion_centrof} proporcionado` });
    }
  };
  

controller.eliminarCertificacionCentrofC = async (req, res, next) => {
  try {
    const idcertificacion_centrof = req.params.idcertificacion_centrof;
    await eliminarCertificacionCentrof(idcertificacion_centrof);
    res.status(200).json({ ...ResponseStructure, message: 'certificado de centro eliminado exitosamente' });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ningún certificado de centro con el ID ${req.params.idcertificacion_centrof} proporcionado` });
  }
};

module.exports = controller;
