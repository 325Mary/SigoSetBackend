const {detalleContrato     ,
    findByDetalle_contrato,
    deleteByiDetalle_contrato,
    findByDetalle_contratoxNombre} = require('../models/detalleContratoModel');
 const pool = require('../config/database');
 
 
 async function crearDetalleContrato(detalle_contratoData) {
  try {
      if (!detalle_contratoData || !detalle_contratoData.idcertificacion_centrof || !detalle_contratoData.idobligaciones_contrato || !detalle_contratoData.cumple || !detalle_contratoData.nombreDetalleContrato) {
          throw new Error('Faltan datos de detalle de contrato');
      }

      const nuevoDetalleContrato = await detalleContrato.create(detalle_contratoData);
      return nuevoDetalleContrato;
  } catch (error) {
      throw error;
  }
}


 
 const obtenerDetallesdeContrato = async () => {
   try {
     const detalleContratos = await detalleContrato.findAll();
     return detalleContratos;
   } catch (error) {
     throw error;
   }
 };
 
 


 
 async function editarDetalleContrato(iddetalle_contrato, nuevoDetalleContratoData) {
   try {
     const detalleContratoExistente = await findByDetalle_contrato(iddetalle_contrato);
     if (!detalleContratoExistente) {
       throw new Error('El detalle contrato no existe');
     }
 
     const detalleContratoActualizado = { ...detalleContratoExistente, ...nuevoDetalleContratoData };
 
     // Realizar la actualización en la base de datos
     const [result] = await pool.execute(
       'UPDATE detalle_contrato SET  dcertificacion_centrof = ?, idobligaciones_contrato = ?, cumple= ?, nombreDetalleContrato = ?  WHERE iddetalle_contrato = ?',
       [
        detalleContratoActualizado.dcertificacion_centrof,
        detalleContratoActualizado.idobligaciones_contrato,
        detalleContratoActualizado.cumple,
         iddetalle_contrato
       ]
     );
 
     // Verificar si la actualización fue exitosa
     if (result.affectedRows === 0) {
       throw new Error('No se pudo actualizar el detalle de contrato');
     }
 
     return detalleContratoActualizado;
   } catch (error) {
     throw error;
   }
 }
 
 async function eliminarDetalleContrato(iddetalle_contrato) {
   try {
     await deleteByiDetalle_contrato(iddetalle_contrato);
     return { message: 'detalle de contrato eliminado exitosamente' };
   } catch (error) {
     throw error;
   }
  }
async function obtenerDetalleContratoPorId(iddetalle_contrato){
    try {
      // Llamar al modelo para buscar el detalle de contrato por ID
      const detalleContrato = await findByDetalle_contrato(iddetalle_contrato);
      return detalleContrato;
    } catch (error) {
      throw error; // Propagar el error para ser manejado por el controlador
    }
  }
 
 

  async function obtenerDetalleContratoPorNombre(nombreDetalleContrato){
    try {
      // Llamar al modelo para buscar el detalle de contrato por ID
      const detalleContratoNombre = await findByDetalle_contratoxNombre(nombreDetalleContrato);
      return detalleContratoNombre;
    } catch (error) {
      throw error; // Propagar el error para ser manejado por el controlador
    }
  }
 

 
 
 
 
 module.exports = {
    crearDetalleContrato,
    obtenerDetallesdeContrato,
    editarDetalleContrato,
    eliminarDetalleContrato,
    obtenerDetalleContratoPorId,
    obtenerDetalleContratoPorNombre
 };
 
