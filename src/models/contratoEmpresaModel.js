const mysql = require('mysql2');


const pool = require('../config/database');

const contratoEmpresa = {
  findAllEmail: function(email_usuario) {
    const sql = `SELECT ce.*, e.nombre_empresa AS nombre_empresa, e.email_representantel AS email_representantel
                 FROM contrato_empresa ce 
                 INNER JOIN empresa e 
                 ON ce.idempresa = e.idempresa 
                 WHERE e.email_representantel = ?`;
    return pool.execute(sql, [email_usuario]);
  },
  findAll: function() {
    const sql = `SELECT ce.*, e.nombre_empresa AS nombre_empresa, e.email_representantel AS email_representantel
                 FROM contrato_empresa ce 
                 INNER JOIN empresa e 
                 ON ce.idempresa = e.idempresa`;
    return pool.execute(sql);
  },
  create: function(contratoEmpresavData) {
    const sql = `INSERT INTO contrato_empresa (idempresa,descripcion_contrato, fecha_inicio, fecha_fin, contrato_pdf) 
                 VALUES (?, ?, ?, ?, ?)`;
    return pool.execute(sql, [contratoEmpresavData.idempresa,contratoEmpresavData.descripcion_contrato, contratoEmpresavData.fecha_inicio, contratoEmpresavData.fecha_fin, contratoEmpresavData.contrato_pdf]);
  }
};

async function findOneContratoEmpres (idempresa) {
  const [rows, fields] = await pool.execute(`SELECT * FROM contrato_empresa WHERE idContrato_empresa = ?` , [idempresa]);
  return rows[0];    throw error;
}


async function findByContratoEmpres (idContrato_empresa) {
    const [rows, fields] = await pool.execute(`SELECT * FROM contrato_empresa WHERE idContrato_empresa = ?` , [idContrato_empresa]);
    return rows[0];    throw error;
  }

async function deleteByIdContratoEmpres(idContrato_empresa) {
    try {
      const [result] = await pool.execute('DELETE FROM contrato_empresa WHERE idContrato_empresa = ?', [idContrato_empresa]);
      if (result.affectedRows === 0) {
        throw new Error('El contrato Empresa no existe');
      }
      return { message: 'Contrato_empresa eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  


module.exports = {contratoEmpresa     ,
    findByContratoEmpres,
    deleteByIdContratoEmpres,
    findOneContratoEmpres
  };
