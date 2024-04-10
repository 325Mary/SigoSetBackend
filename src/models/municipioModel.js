const mysql = require('mysql2');


const pool = require('../config/database');

const Municipio = {
  findAll: function() {
    return pool.execute('SELECT * FROM municipio'); // Utiliza pool.execute() para obtener una promesa
  },
  create: function(municipioData) {
    const sql = `INSERT INTO municipio ( iddepartamento, municipio) VALUES ( ?, ?)`;
    return pool.execute(sql, [ municipioData.iddepartamento, municipioData.municipio]);
  }
};


async function findByMunicipio (idmunicipio) {
    const [rows, fields] = await pool.execute(`SELECT * FROM municipio WHERE idmunicipio = ?` , [idmunicipio]);
    return rows[0];    throw error;
  }

async function deleteByIdMunicipio(idmunicipio) {
    try {
      const [result] = await pool.execute('DELETE FROM municipio WHERE idmunicipio = ?', [idmunicipio]);
      if (result.affectedRows === 0) {
        throw new Error('El municipio no existe');
      }
      return { message: 'municipio eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  


module.exports = {Municipio     ,
    findByMunicipio,
  deleteByIdMunicipio};
