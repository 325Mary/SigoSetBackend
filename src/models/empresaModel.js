const mysql = require('mysql2');

const pool = require('../config/database');

const Empresa = {
  findAll: function() {
    return pool.execute('SELECT * FROM empresa'); // Utiliza pool.execute() para obtener una promesa
  },
  findAllByEmail: function(email_usuario) {
    return pool.execute('SELECT * FROM empresa WHERE email_representantel = ?', [email_usuario]);
  },
  create: function(empresaData) {
    const sql = `INSERT INTO empresa (  
        nombre_empresa ,
        nit_empresa, 
        direccion_empresa ,
        telefono_empresa ,
        email_empresa,
        representante_legal ,
        telefono_representantel,
        email_representantel ,
        persona_contacto ,
        telefono_personac ,
        email_personac) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    return pool.execute(sql, [ 
        empresaData.nombre_empresa ,
        empresaData.nit_empresa, 
        empresaData.direccion_empresa ,
        empresaData.telefono_empresa ,
        empresaData.email_empresa,
        empresaData. representante_legal ,
        empresaData.telefono_representantel,
        empresaData.email_representantel ,
        empresaData. persona_contacto ,
        empresaData.telefono_personac ,
        empresaData.email_personac]);
  }
};


async function findNit(nit_empresa) {
  const [rows, fields] = await pool.execute('SELECT * FROM empresa WHERE nit_empresa = ?', [nit_empresa]);
  return rows[0];
}


async function findByEmpresa (idempresa) {
    const [rows, fields] = await pool.execute(`SELECT * FROM empresa WHERE idempresa = ?` , [idempresa]);
    return rows[0];    throw error;
  }

async function deleteByEmpresa(idempresa) {
    try {
      const [result] = await pool.execute('DELETE FROM empresa WHERE idempresa = ?', [idempresa]);
      if (result.affectedRows === 0) {
        throw new Error('la empresa no existe');
      }
      return { message: 'empresa eliminada exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  


module.exports = {Empresa,
    findByEmpresa,
    deleteByEmpresa,
  findNit};
