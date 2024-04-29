const {detalleContrato     ,
    findByDetalle_contrato,
    deleteByiDetalle_contrato} = require('../models/detalleContratoModel');
 const pool = require('../config/database');
 
 
 async function crearDetalleContrato(detalle_contratoData) {
   try {
       if (!detalle_contratoData  || !detalle_contratoData.dcertificacion_centrof || !detalle_contratoData.idobligaciones_contrato || !detalle_contratoData.cumple) {
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
       'UPDATE detalle_contrato SET  dcertificacion_centrof = ?, idobligaciones_contrato = ?, cumple= ?  WHERE iddetalle_contrato = ?',
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
 

 

 
 
 
 
 module.exports = {
    crearDetalleContrato,
    obtenerDetallesdeContrato,
    editarDetalleContrato,
    eliminarDetalleContrato
 };
 
