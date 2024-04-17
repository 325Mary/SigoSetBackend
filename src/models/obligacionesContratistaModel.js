const mysql = require('mysql2');


const pool = require('../config/database');

const obligacionesContratista = {
  findAll: function() {
    return pool.execute('SELECT * FROM obligaciones_contratista'); // Utiliza pool.execute() para obtener una promesa
  },
  create: function(obligacionesContratistaData) {
    const sql = `INSERT INTO obligaciones_contratista ( obligacion_contratista) VALUES (?)`;
    return pool.execute(sql, [ obligacionesContratistaData.obligacion_contratista]);
  }
};

async function findOneObligacionContratista(obligacion_contratista) {
  const [rows, fields] = await pool.execute('SELECT * FROM obligaciones_contratista WHERE obligacion_contratista = ?', [obligacion_contratista]);
  return rows[0];
}

async function findByObligacionesContratista (idobligaciones_contratista) {
    const [rows, fields] = await pool.execute(`SELECT * FROM obligaciones_contratista WHERE idobligaciones_contratista = ?` , [idobligaciones_contratista]);
    return rows[0];    throw error;
  }

async function deleteByIobligacionesContratista(idobligaciones_contratista) {
    try {
      const [result] = await pool.execute('DELETE FROM obligaciones_contratista WHERE idobligaciones_contratista = ?', [idobligaciones_contratista]);
      if (result.affectedRows === 0) {
        throw new Error(' obligacion    contratista no existe');
      }
      return { message: 'obligacion de contratista eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  


module.exports = {obligacionesContratista     ,
  findByObligacionesContratista,
    deleteByIobligacionesContratista,
    findOneObligacionContratista
  };
