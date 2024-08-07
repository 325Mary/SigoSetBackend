const mysql = require('mysql2');


const pool = require('../config/database');

const solicitudes_puestos = {
  findAll: function() {
    return pool.execute('SELECT * FROM solicitudes_puestos'); 
  },
  findAllXcentro: function(idcentro_formacion) {
    return pool.execute('SELECT * FROM solicitudes_puestos where idcentro_formacion = ?', [idcentro_formacion]); 
  },
  create: function(solicitudes_puestosData) {
    const sql = `INSERT INTO solicitudes_puestos (idcentro_formacion, idempresa, idpuesto, idsede_formacion, tipo_puesto, cantidad_solicitada, descripcion_Solicitud, 
    fecha_solicitud ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    return pool.execute(sql, [
      solicitudes_puestosData.idcentro_formacion, 
      solicitudes_puestosData.idempresa, 
      solicitudes_puestosData.idpuesto,
      solicitudes_puestosData.idsede_formacion, 
      solicitudes_puestosData.tipo_puesto,
      solicitudes_puestosData.cantidad_solicitada,  
      solicitudes_puestosData.descripcion_Solicitud, 
      solicitudes_puestosData.fecha_solicitud
    ]);
    
  }
};



async function findBysolicitudes_puestos (idsolicitud_puesto) {
    const [rows, fields] = await pool.execute(`SELECT * FROM solicitudes_puestos WHERE idsolicitud_puesto = ?` , [idsolicitud_puesto]);
    return rows[0];    throw error;
  }

async function deleteByidsolicitud_puesto(idsolicitud_puesto) {
    try {
      const [result] = await pool.execute('DELETE FROM solicitudes_puestos WHERE idsolicitud_puesto = ?', [idsolicitud_puesto]);
      if (result.affectedRows === 0) {
        throw new Error('El solicitudes_puestos no existe');
      }
      return { message: 'solicitudes_puestos eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  


module.exports = {solicitudes_puestos,
    findBysolicitudes_puestos,
    deleteByidsolicitud_puesto,
  };
