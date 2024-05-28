const mysql = require('mysql2');


const pool = require('../config/database');

const Departamento = {
  findAll: function() {
    return pool.execute('SELECT * FROM departamento'); // Utiliza pool.execute() para obtener una promesa
  },
  create: function(departamentoData) {
    const sql = `INSERT INTO departamento ( departamento) VALUES ( ?)`;
    return pool.execute(sql, [ departamentoData.departamento]);
  }
};
async function findOneDepartamento(departamento) {
  const [rows, fields] = await pool.execute('SELECT * FROM departamento WHERE departamento = ?', [departamento]);
  return rows[0];
}


async function findByIdDepartamento (iddepartamento) {
    const [rows, fields] = await pool.execute(`SELECT * FROM departamento WHERE iddepartamento = ?` , [iddepartamento]);
    return rows[0];    throw error;
  }

async function deleteByIdDepartamento(iddepartamento) {
    try {
      const [result] = await pool.execute('DELETE FROM departamento WHERE iddepartamento = ?', [iddepartamento]);
      if (result.affectedRows === 0) {
        throw new Error('El departamento no existe');
      }
      return { message: 'departamento eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  


module.exports = {Departamento     ,
    findOneDepartamento,
    findByIdDepartamento,
    deleteByIdDepartamento};
