const {Municipio     ,
    findByMunicipio,
  deleteByIdMunicipio} = require('../models/municipioModel');
 const pool = require('../config/database');
 const nodemailer = require('nodemailer');
 
 
 require('dotenv').config();
 
 
 async function crearMunicipio(municipioData) {
   try {
       if (!municipioData  || !municipioData.iddepartamento || !municipioData.municipio ) {
           throw new Error('Faltan datos del municipio');
       }
 

       const nuevoMunicipio = await Municipio.create(municipioData);
       return nuevoMunicipio;
   } catch (error) {
       throw error;
   }
 }
 
 const obtenerMunicipios = async () => {
   try {
     const municipios = await Municipio.findAll();
     return municipios;
   } catch (error) {
     throw error;
   }
 };
 
 


 
 async function editarMunicipio(idmunicipio, nuevoMunicioData) {
   try {
     const municipioExistente = await findByMunicipio(idmunicipio);
     if (!municipioExistente) {
       throw new Error('El municipio no existe');
     }
 
     const municipioActualizado = { ...municipioExistente, ...nuevoMunicioData };
 
     // Realizar la actualización en la base de datos
     const [result] = await pool.execute(
       'UPDATE municipio SET  iddepartamento = ?, municipio = ?  WHERE idmunicipio = ?',
       [
         municipioActualizado.iddepartamento,
         municipioActualizado.municipio,
         idmunicipio
       ]
     );
 
     // Verificar si la actualización fue exitosa
     if (result.affectedRows === 0) {
       throw new Error('No se pudo actualizar el municipio');
     }
 
     return municipioActualizado;
   } catch (error) {
     throw error;
   }
 }
 
 async function eliminarMunicipio(idmunicipio) {
   try {
     await deleteByIdMunicipio(idmunicipio);
     return { message: 'municipio eliminado exitosamente' };
   } catch (error) {
     throw error;
   }
 }
 

 

 
 
 
 
 module.exports = {
    crearMunicipio,
    obtenerMunicipios,
    editarMunicipio,
    eliminarMunicipio
 };
 
