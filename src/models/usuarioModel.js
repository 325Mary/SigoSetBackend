const mysql = require('mysql2');


const pool = require('../config/database');

const Usuario = {
  findAll: function() {
    const sql = `
      SELECT usuario.*, 
             centro_formacion.centro_formacion AS nombre_centro,              centro_formacion.telefono_centrof AS telefono_centro, 
             perfil.perfil AS nombre_perfil
      FROM usuario
      INNER JOIN centro_formacion ON usuario.idcentro_formacion = centro_formacion.idcentro_formacion
      INNER JOIN perfil ON usuario.idperfil = perfil.idperfil
    `;
    return pool.execute(sql);
  },
  create: function(usuarioData) {
    const sql = `INSERT INTO usuario (idperfil, idcentro_formacion, identificacion, nombre_usuario, apellido_usuario, telefono_usuario, email_usuario, password, estado, firstLogin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    return pool.execute(sql, [usuarioData.idperfil, usuarioData.idcentro_formacion, usuarioData.identificacion, usuarioData.nombre_usuario, usuarioData.apellido_usuario, usuarioData.telefono_usuario, usuarioData.email_usuario, usuarioData.password, usuarioData.estado, usuarioData.firstLogin]);
  }
};

async function findOneByEmail(email_usuario) {
  const [rows, fields] = await pool.execute('SELECT * FROM usuario WHERE email_usuario = ?', [email_usuario]);
  return rows[0];
}


async function findByPk (idUsuario) {
    const [rows, fields] = await pool.execute(`SELECT * FROM usuario WHERE idUsuario = ?` , [idUsuario]);
    return rows[0];    throw error;
  }

async function deleteById(idUsuario) {
    try {
      const [result] = await pool.execute('DELETE FROM usuario WHERE idUsuario = ?', [idUsuario]);
      if (result.affectedRows === 0) {
        throw new Error('El usuario no existe');
      }
      return { message: 'Usuario eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  


module.exports = {Usuario,
  findOneByEmail,
  findByPk,
  deleteById};
