const {obligacionesContratista     ,
    findByObligacionesContratista,
    deleteByIobligacionesContratista} = require('../models/obligacionesContratistaModel');
    const pool = require('../config/database');

 async function crearObligacionesContratista(obligacionesContratistaData) {
   try {
       if (!obligacionesContratistaData  || !obligacionesContratistaData.obligacion_contratista) {
           throw new Error('Faltan datos de obligacion decontratista');
       }
 

       const nuevaObligacionContratista = await obligacionesContratista.create(obligacionesContratistaData);
       return nuevaObligacionContratista;
   } catch (error) {
       throw error;
   }
 }
 
 const obtenerObligacionesContratista = async () => {
   try {
     const listObligacionesContratista = await obligacionesContratista.findAll();
     return listObligacionesContratista;
   } catch (error) {
     throw error;
   }
 };
 
 


 
 async function editarObligacionesContratista(idobligaciones_contratista, nuevaObligacionContratistaData) {
   try {
     const obligacionesContratistaExistente = await findByObligacionesContratista(idobligaciones_contratista);
     if (!obligacionesContratistaExistente) {
       throw new Error(' obligacion de Contratista no existe');
     }
 
     const obligacionesContratistaActualizado = { ...obligacionesContratistaExistente, ...nuevaObligacionContratistaData };
 
     // Realizar la actualización en la base de datos
     const [result] = await pool.execute(
       'UPDATE obligaciones_contratista SET obligacion_contratista = ?  WHERE idobligaciones_contratista = ?',
       [
        obligacionesContratistaActualizado.obligacion_contratista,
        idobligaciones_contratista
       ]
     );
 
     // Verificar si la actualización fue exitosa
     if (result.affectedRows === 0) {
       throw new Error('No se pudo actualizar  la obligacion Contratista');
     }
 
     return obligacionesContratistaActualizado;
   } catch (error) {
     throw error;
   }
 }
 
 async function eliminarObligacionesContratista(idobligaciones_contratista) {
   try {
     await deleteByIobligacionesContratista(idobligaciones_contratista);
     return { message: 'obligacion contratista eliminado exitosamente' };
   } catch (error) {
     throw error;
   }
 }
 

 

 
 
 
 
 module.exports = {
    crearObligacionesContratista,
    obtenerObligacionesContratista,
    editarObligacionesContratista,
    eliminarObligacionesContratista
 };
 