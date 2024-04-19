const mysql = require('mysql2');


const pool = require('../config/database');

const certificacionCentrof = {
  findAll: function() {
    return pool.execute('SELECT * FROM  certificacion_centrof '); // Utiliza pool.execute() para obtener una promesa
  },
  create: function(certificacionCentrofData) {
    const sql = `INSERT INTO certificacion_centrof (idcentro_formacion, fecha_inicio, fecha_fin) VALUES (?, ?, ?)`;
    return pool.execute(sql, [certificacionCentrofData.idcentro_formacion, certificacionCentrofData.fecha_inicio, certificacionCentrofData.fecha_fin]);
  }
};



async function findByPkcertificacionCentrof (idcertificacion_centrof) {
    const [rows, fields] = await pool.execute(`SELECT * FROM certificacion_centrof WHERE idcertificacion_centrof = ?` , [idcertificacion_centrof]);
    return rows[0];    throw error;
  }

async function deleteByIdcertificacionCentrof(idcertificacion_centrof) {
    try {
      const [result] = await pool.execute('DELETE FROM certificacion_centrof WHERE idcertificacion_centrof = ?', [idcertificacion_centrof]);
      if (result.affectedRows === 0) {
        throw new Error('El certificado de centro no existe');
      }
      return { message: 'certificado de centro eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  


module.exports = {certificacionCentrof,
    findByPkcertificacionCentrof,
    deleteByIdcertificacionCentrof,
  };
