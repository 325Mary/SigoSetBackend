const {solicitudes_puestos,
    findBysolicitudes_puestos,
    deleteByidsolicitud_puesto,} = require('../models/solicitudPuestosModel');
 const pool = require('../config/database');

 async function crearSolicitudes_puestos(solicitudes_puestosData) {
   try {
       if (!solicitudes_puestosData  || !solicitudes_puestosData.idcentro_formacion || !solicitudes_puestosData.idempresa || !solicitudes_puestosData.idsede_formacion || !solicitudes_puestosData.idpuesto || !solicitudes_puestosData.tipo_puesto ||
!        solicitudes_puestosData.cantidad_solicitada || ! solicitudes_puestosData.descripcion_Solicitud || !solicitudes_puestosData.fecha_solicitud ) {
           throw new Error('Faltan datos del Solicitudes_puestos');
       }
 

       const nuevoSolicitudes_puestos = await solicitudes_puestos.create(solicitudes_puestosData);
       return nuevoSolicitudes_puestos;
   } catch (error) {
       throw error;
   }
 }
 
 
 const obtenerSolicitudes_puestos = async () => {
   try {
     const Solicitudes_puestoses = await solicitudes_puestos.findAll();
     return Solicitudes_puestoses;
   } catch (error) {
     throw error;
   }
 };
 

 async function obtenerSolicitudes_puestosXcentro(idcentro_formacion) {
    try {
      const [rows] = await solicitudes_puestos.findAllXcentro(idcentro_formacion);
      return rows;
    } catch (error) {
      throw error;
    }
  }


 
  async function editarSolicitudes_puestos(idsolicitud_puesto, nuevoSolicitudes_puestosData) {
    try {
        // Verificar si el registro existe
        const Solicitudes_puestosExistente = await findBysolicitudes_puestos(idsolicitud_puesto);
        if (!Solicitudes_puestosExistente) {
            throw new Error('El Solicitudes_puestos no existe');
        }

        // Crear un objeto con los datos actualizados
        const Solicitudes_puestosActualizado = { ...Solicitudes_puestosExistente, ...nuevoSolicitudes_puestosData };

        // Realizar la actualización en la base de datos
        const sql = `
            UPDATE solicitudes_puestos 
            SET idcentro_formacion = ?, 
                idempresa = ?, 
                idpuesto = ?, 
                idsede_formacion = ?, 
                tipo_puesto = ?, 
                cantidad_solicitada = ?, 
                descripcion_Solicitud = ?, 
                fecha_solicitud = ? ,
                respuesta = ?,
                fecha_Respuesta = ?,
                estado_solicitud = ?
            WHERE idsolicitud_puesto = ?
        `;
        const values = [
            Solicitudes_puestosActualizado.idcentro_formacion,
            Solicitudes_puestosActualizado.idempresa,
            Solicitudes_puestosActualizado.idpuesto,
            Solicitudes_puestosActualizado.idsede_formacion,
            Solicitudes_puestosActualizado.tipo_puesto,
            Solicitudes_puestosActualizado.cantidad_solicitada,
            Solicitudes_puestosActualizado.descripcion_Solicitud,
            Solicitudes_puestosActualizado.fecha_solicitud,
            Solicitudes_puestosActualizado.respuesta,
            Solicitudes_puestosActualizado.fecha_Respuesta,
            Solicitudes_puestosActualizado.estado_solicitud,
            idsolicitud_puesto
        ];

        const [result] = await pool.execute(sql, values);

        // Verificar si la actualización fue exitosa
        if (result.affectedRows === 0) {
            throw new Error('No se pudo actualizar el Solicitudes_puestos');
        }

        return Solicitudes_puestosActualizado;
    } catch (error) {
        throw error;
    }
}

  
 async function eliminarSolicitudes_puestos(idsolicitud_puesto) {
   try {
     await deleteByidsolicitud_puesto(idsolicitud_puesto);
     return { message: 'Solicitudes_puestos eliminado exitosamente' };
   } catch (error) {
     throw error;
   }
 }
 

 

 
 
 
 
 module.exports = {
    crearSolicitudes_puestos,
    obtenerSolicitudes_puestos,
    editarSolicitudes_puestos,
    eliminarSolicitudes_puestos,
    obtenerSolicitudes_puestosXcentro
 };
 
