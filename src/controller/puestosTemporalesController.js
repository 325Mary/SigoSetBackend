const { response } = require('express');
const { ResponseStructure } = require('../helpers/ResponseStructure');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');

const {
    crearPuestosTemporales,
    ObtenerPuestosTemprales,
    editarPuestoTemporal,
    eliminarPuestoTemporal
}=require( '../services/PuestosTemporalesService')

const controller = {}

controller.crearPuestosTemporalesController = async (req, res, next)=> {
    try {
        validarCamposRequeridos(['tipo_Puesto', 'fecha_inicio','fecha_fin', 'cantidad'])
    (req, res, async ()=> {

        const PuestoTemporalData = req.body;
        const result= await crearPuestosTemporales(PuestoTemporalData)

        const PuestoTemporal = result[0];
        res.status(201).json({
            ...ResponseStructure,
            mensage: 'Creado exitosamente',
            data: {
                idPuestosTemporales: PuestoTemporal.insertId,
                ...PuestoTemporalData
            }
        })
    })
    } catch(error){
        next(error)
    }
}



controller.obtenerPuestosTemporalesController = async (req, res, next) => {
    try {
        const { idcentro_formacion } = req.params;
        if (!idcentro_formacion) {
            return res.status(400).json({ ...ResponseStructure, status: 400, error: 'Falta el parámetro idcentro_formacion' });
        }

        const listPuestosTemporales = await ObtenerPuestosTemprales(idcentro_formacion);

        res.status(200).json({ ...ResponseStructure, data: listPuestosTemporales });
    } catch (error) {
        res.status(404).json({ ...ResponseStructure, status: 404, error:'No se encontraron Puestos  T' });
    }
};


  controller.editarPuestosTemporalesfC = async (req, res, next) => {
      try {
        const idPuestosTemporales = req.params.idPuestosTemporales;
        const nuevoPuestosTemporalesfData = req.body;
    
        // Verificar si el cuerpo de la solicitud está vacío
        if (Object.keys(nuevoPuestosTemporalesfData).length === 0) {
          return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud está vacío' });
        }
    
        // Definir los campos válidos esperados
        const camposValidos = ['idcentro_formacion', 'fecha_inicio', 'fecha_fin', 'idempresa', 'idsede_formacion', 'idpuntosvelectronica', 'idpuestosvxcentrof', 'tipo_Puesto', 'cantidad', 'estado'];
    
        // Verificar si todos los campos recibidos están en la lista de campos válidos
        const camposRecibidos = Object.keys(nuevoPuestosTemporalesfData);
        const camposInvalidos = camposRecibidos.filter(field => !camposValidos.includes(field));
    
        if (camposInvalidos.length > 0) {
          return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud contiene campos no válidos', invalidFields: camposInvalidos });
        }
    
        const PuestosTemporalesf = await editarPuestoTemporal(idPuestosTemporales, nuevoPuestosTemporalesfData);
        res.status(200).json({ ...ResponseStructure, message: 'certificado de centro actualizado exitosamente', data: PuestosTemporalesf });
      } catch (error) {
        res.status(404).json({ ...ResponseStructure, status: 404, error:  `No se encontró ningún certificado de centro con el ID ${req.params.idPuestosTemporales} proporcionado` });
      }
    };
    
  
  controller.eliminarPuestosTemporalesfC = async (req, res, next) => {
    try {
      const idPuestosTemporales = req.params.idPuestosTemporales;
      await eliminarPuestoTemporal(idPuestosTemporales);
      res.status(200).json({ ...ResponseStructure, message: 'certificado de centro eliminado exitosamente' });
    } catch (error) {
      res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ningún certificado de centro con el ID ${req.params.idPuestosTemporales} proporcionado` });
    }
  };
  
  module.exports = controller;
  
