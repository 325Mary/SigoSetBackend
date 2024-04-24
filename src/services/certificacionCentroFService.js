const {certificacionCentrof,
    findByPkcertificacionCentrof,
    deleteByIdcertificacionCentrof} = require('../models/certificacionCentroFModel');
 const pool = require('../config/database');

 async function crearCertificacionCentrof(certificacionCentrofData) {
   try {
       if (!certificacionCentrofData  || !certificacionCentrofData.idcentro_formacion || !certificacionCentrofData.fecha_inicio || !certificacionCentrofData.fecha_fin ) {
           throw new Error('Faltan datos del certificacion de centro');
       }
 

       const nuevoCertificacionCentrof= await certificacionCentrof.create(certificacionCentrofData);
       return nuevoCertificacionCentrof;
   } catch (error) {
       throw error;
   }
 }
 
 const obtenerCertificacionCentrof = async () => {
   try {
     const CertificacionESCentrof = await certificacionCentrof.findAll();
     return CertificacionESCentrof;
   } catch (error) {
     throw error;
   }
 };
 
 


 
 async function editarCertificacionCentrof(idcertificacion_centrof, nuevocertificacionCentrofData) {
   try {
     const certificacionCentrofoExistente = await findByPkcertificacionCentrof(idcertificacion_centrof);
     if (!certificacionCentrofoExistente) {
       throw new Error('El certificado de centro no existe');
     }
 
     const certificacionCentrofActualizado = { ...certificacionCentrofoExistente, ...nuevocertificacionCentrofData };
 
     // Realizar la actualización en la base de datos
     const [result] = await pool.execute(
       'UPDATE certificacion_centrof SET  idcentro_formacion = ?, fecha_inicio = ?, fecha_fin = ?  WHERE idcertificacion_centrof = ?',
       [
        certificacionCentrofActualizado.idcentro_formacion,
        certificacionCentrofActualizado.fecha_inicio,
        certificacionCentrofActualizado.fecha_fin,
        idcertificacion_centrof
       ]
     );
 
     // Verificar si la actualización fue exitosa
     if (result.affectedRows === 0) {
       throw new Error('No se pudo actualizar el certificado de centro');
     }
 
     return certificacionCentrofActualizado;
   } catch (error) {
     throw error;
   }
 }
 
 async function eliminarCertificacionCentrof(idcertificacion_centrof) {
   try {
     await deleteByIdcertificacionCentrof(idcertificacion_centrof);
     return { message: 'certificado de centro eliminado exitosamente' };
   } catch (error) {
     throw error;
   }
 }
 

 

 
 
 
 
 module.exports = {
    crearCertificacionCentrof,
    obtenerCertificacionCentrof,
    editarCertificacionCentrof,
    eliminarCertificacionCentrof
 };
 