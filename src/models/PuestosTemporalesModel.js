const mysql = require('mysql2');


const pool = require('../config/database');

const PuestosTemporales = {
  findAll: async function(idcentro_formacion) {
    try {
      const [rows] = await pool.execute('SELECT * FROM puestos_temporales WHERE idcentro_formacion = ?', [idcentro_formacion]);
            return rows;
    } catch (error) {
      throw new Error(`Error al ejecutar la consulta: ${error.message}`);
    }
  },
  create: function(PuestosTemporalesData) {
    const sql = `INSERT INTO puestos_temporales (idcentro_formacion, idempresa, idsede_formacion, tipo_Puesto, cantidad, estado, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    return pool.execute(sql, [PuestosTemporalesData.idcentro_formacion, PuestosTemporalesData.idempresa, PuestosTemporalesData.idsede_formacion, PuestosTemporalesData.tipo_Puesto, PuestosTemporalesData.cantidad, PuestosTemporalesData.estado, PuestosTemporalesData.fecha_inicio, PuestosTemporalesData.fecha_fin]);
  }
};



async function findByPkPuestosTemporales (idPuestosTemporales) {
    const [rows, fields] = await pool.execute(`SELECT * FROM puestos_temporales WHERE idPuestosTemporales = ?` , [idPuestosTemporales]);
    return rows[0];    throw error;
  }

async function deleteByIdPuestosTemporales(idPuestosTemporales) {
    try {
      const [result] = await pool.execute('DELETE FROM puestos_temporales WHERE idPuestosTemporales = ?', [idPuestosTemporales]);
      if (result.affectedRows === 0) {
        throw new Error('el id no existe');
      }
      return { message: 'el id eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  


module.exports = {PuestosTemporales,
    findByPkPuestosTemporales,
    deleteByIdPuestosTemporales,
  };
