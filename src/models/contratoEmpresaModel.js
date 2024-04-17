const mysql = require('mysql2');


const pool = require('../config/database');

const contratoEmpresa = {
  findAll: function() {
    return pool.execute('SELECT * FROM contrato_empresav'); // Utiliza pool.execute() para obtener una promesa
  },
  create: function(contratoEmpresavData) {
    const sql = `INSERT INTO contrato_empresav ( idempresa_vigilancia, fecha_inicio, fecha_fin) VALUES ( ?, ?. ?)`;
    return pool.execute(sql, [ contratoEmpresavData.idempresa_vigilancia, contratoEmpresavData.fecha_inicio, contratoEmpresavData.fecha_fin]);
  }
};


async function findByContratoEmpres (idContrato_empresav) {
    const [rows, fields] = await pool.execute(`SELECT * FROM contrato_empresav WHERE idContrato_empresav = ?` , [idContrato_empresav]);
    return rows[0];    throw error;
  }

async function deleteByIdContratoEmpres(idContrato_empresav) {
    try {
      const [result] = await pool.execute('DELETE FROM contrato_empresav WHERE idContrato_empresav = ?', [idContrato_empresav]);
      if (result.affectedRows === 0) {
        throw new Error('El contrato Empresa no existe');
      }
      return { message: 'Contrato_empresav eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  


module.exports = {contratoEmpresa     ,
    findByContratoEmpres,
    deleteByIdContratoEmpres,
  };
