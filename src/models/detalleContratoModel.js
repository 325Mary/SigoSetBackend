const mysql = require('mysql2');


const pool = require('../config/database');

const detalleContrato = {
  findAll: function() {
    return pool.execute('SELECT * FROM detalle_contrato'); // Utiliza pool.execute() para obtener una promesa
  },
  create: function(detalle_contratoData) {
    const sql = `INSERT INTO detalle_contrato ( dcertificacion_centrof, idobligaciones_contrato, cumple) VALUES ( ?, ?, ?)`;
    return pool.execute(sql, [ detalle_contratoData.dcertificacion_centrof, detalle_contratoData.idobligaciones_contrato, detalle_contratoData.cumple]);
  }
};



async function findByDetalle_contrato (iddetalle_contrato) {
    const [rows, fields] = await pool.execute(`SELECT * FROM detalle_contrato WHERE iddetalle_contrato = ?` , [iddetalle_contrato]);
    return rows[0];    throw error;
  }

async function deleteByiDetalle_contrato(iddetalle_contrato) {
    try {
      const [result] = await pool.execute('DELETE FROM detalle_contrato WHERE iddetalle_contrato = ?', [iddetalle_contrato]);
      if (result.affectedRows === 0) {
        throw new Error('El detalle de contrato no existe');
      }
      return { message: 'Detalle de contrato eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  


module.exports = {detalleContrato     ,
  findByDetalle_contrato,
  deleteByiDetalle_contrato,
  };
