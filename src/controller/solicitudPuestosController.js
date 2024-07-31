const { ResponseStructure } = require('../helpers/ResponseStructure');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');
const {   crearSolicitudes_puestos,
    obtenerSolicitudes_puestos,
    editarSolicitudes_puestos,
    eliminarSolicitudes_puestos,
    obtenerSolicitudes_puestosXcentro } = require('../services/solicitudPuestosServcie');
const {findBysolicitudes_puestos} = require('../models/solicitudPuestosModel')

const controller = {}

controller.crearsolicitud_puestoC = async (req, res, next) => {
  try {
    validarCamposRequeridos(['idcentro_formacion','idempresa','idpuesto','idsede_formacion','tipo_puesto','descripcion_Solicitud','fecha_solicitud', 'fecha_inicio', 'fecha_fin'])(req, res, async () => {
      const solicitud_puestoData = req.body;
      solicitud_puestoData.idpuntosvelectronica = solicitud_puestoData.idpuntosvelectronica || null;
      solicitud_puestoData.idpuestosvxcentrof = solicitud_puestoData.idpuestosvxcentrof || null
      
      const solicitud_puesto = await crearSolicitudes_puestos(solicitud_puestoData);
      res.status(201).json({ ...ResponseStructure, message: 'solicitud_puesto creado exitosamente', data: solicitud_puesto });
    });
  } catch (error) {
    next(error);
  } 
};

controller.obtenersolicitud_puestoesC = async (req, res, next) => {
  try {
    const listsolicitud_puestoes = await obtenerSolicitudes_puestos();
    res.status(200).json({ ...ResponseStructure, data: listsolicitud_puestoes });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se obtuvieron los solicitud_puestoes' });
  }
};

controller.obtenersolicitud_puestosXcentroC = async (req, res, next) => {
    try {
      const idcentro_formacion = req.params.idcentro_formacion;
      const listsolicitud_puestoes = await obtenerSolicitudes_puestosXcentro(idcentro_formacion);
      res.status(200).json({ ...ResponseStructure, data: listsolicitud_puestoes });
    } catch (error) {
      res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se obtuvieron los solicitud_puestoes' });
    }
  };

  
  controller.editarsolicitud_puestoC = async (req, res, next) => {
    try {
        const idsolicitud_puesto = req.params.idsolicitud_puesto;
        const nuevosolicitud_puestoData = req.body;

        // Verificar si el cuerpo de la solicitud está vacío
        if (Object.keys(nuevosolicitud_puestoData).length === 0) {
            return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud está vacío' });
        }

        // Verificar si el registro existe
        const solicitudExistente = await findBysolicitudes_puestos(idsolicitud_puesto);
        if (!solicitudExistente) {
            return res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se encontró ningún solicitud_puesto con el ID proporcionado' });
        }

        // Actualizar la solicitud
        const solicitud_puestoActualizado = await editarSolicitudes_puestos(idsolicitud_puesto, nuevosolicitud_puestoData);
        res.status(200).json({ ...ResponseStructure, message: 'solicitud_puesto actualizado exitosamente', data: solicitud_puestoActualizado });
    } catch (error) {
        console.error('Error al actualizar solicitud_puesto:', error);
        res.status(500).json({ ...ResponseStructure, status: 500, error: 'Error interno del servidor' });
    }
};



controller.eliminarsolicitud_puestoC = async (req, res, next) => {
  try {
    const idsolicitud_puesto = req.params.idsolicitud_puesto;
    await eliminarSolicitudes_puestos(idsolicitud_puesto);
    res.status(200).json({ ...ResponseStructure, message: 'solicitud_puesto eliminado exitosamente' });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ningún solicitud_puesto con el ID ${req.params.idsolicitud_puesto} proporcionado` });
  }
};

module.exports = controller;
