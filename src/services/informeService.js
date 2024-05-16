const {Informes     ,
    findByInformes,
    deleteByIdInformes} = require('../models/informesModel');
 const pool = require('../config/database');
 
 
 
 
 async function crearInforme(informesData) {
   try {
       if (!informesData  || !informesData.id_zona || !informesData.id_departamento || informesData.id_municipio || informesData.id_centro_formacion || informesData.servicio  || informesDatapuestos_seleccionados || informesData.fecha_creacion  || informesData.validaciones) {
           throw new Error('Faltan datos de Informe');
       }
 

       const nuevoInforme = await Informes.create(municipioData);
       return nuevoInforme;
   } catch (error) {
       throw error;
   }
 }
 
 const obtenerInformes = async () => {
   try {
     const informes = await Informes.findAll();
     return informes;
   } catch (error) {
     throw error;
   }
 };
 
 


 
 async function editarInforme(idInformes, nuevoInformeData) {
   try {
     const informeExistente = await findByInformes(idInformes);
     if (!informeExistente) {
       throw new Error('El informe no existe');
     }
 
     const informeActualizado = { ...informeExistente, ...nuevoInformeData };
 
     // Realizar la actualización en la base de datos
     const [result] = await pool.execute(
       'UPDATE municipio SET  id_zona = ?, id_departamento = ?, id_municipio = ?, id_centro_formacion = ?, servicio = ?, puestos_seleccionados = ?, fecha_creacion = ?, validaciones = ?  WHERE idInformes = ?',
       [
        informeActualizado.id_zona,
        informeActualizado.id_departamento,
        informeActualizado.id_municipio,
        informeActualizado.id_centro_formacion,
        informeActualizado.servicio,
        informeActualizado.puestos_seleccionados,
        informeActualizado.fecha_creacion,
        informeActualizado.validaciones,
         idInformes
       ]
     );
 
     // Verificar si la actualización fue exitosa
     if (result.affectedRows === 0) {
       throw new Error('No se pudo actualizar el informe');
     }
 
     return informeActualizado;
   } catch (error) {
     throw error;
   }
 }
 
 async function eliminarInforme(idInformes) {
   try {
     await deleteByIdInformes(idInformes);
     return { message: 'informe eliminado exitosamente' };
   } catch (error) {
     throw error;
   }
 }
 

 

 
 
 
 
 module.exports = {
    crearInforme,
    obtenerInformes,
    editarInforme,
    eliminarInforme
 };
 