const mysql = require('mysql2');


const pool = require('../config/database');

const Informes = {
    findAll: function() {
        return pool.execute(`
          SELECT 
            Informes.id,
            zona.Nombre_zona AS nombre_zona,
            departamento.departamento AS departamento,
            municipio.municipio AS municipio,
            centro_formacion.centro_formacion AS centro_formacion,
            Informes.servicio,
            Informes.puestos_seleccionados,
            Informes.fecha_creacion,
            Informes.validaciones
          FROM 
            Informes
          JOIN 
            zona ON Informes.id_zona = zona.idzona
          JOIN 
            departamento ON Informes.id_departamento = departamento.iddepartamento
          JOIN 
            municipio ON Informes.id_municipio = municipio.idmunicipio
          JOIN 
            centro_formacion ON Informes.id_centro_formacion = centro_formacion.idcentro_formacion
        `);
      },
      
  create: function(informesData) {
    const sql = `INSERT INTO informes (id_zona, id_departamento, id_municipio, id_centro_formacion, servicio, puestos_seleccionados, fecha_creacion, validaciones) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)`;
    return pool.execute(sql, [ informesData.id_zona, informesData.id_departamento, informesData.id_municipio, informesData.id_centro_formacion, informesData.servicio, informesData.puestos_seleccionados, informesData.fecha_creacion, informesData.validaciones ]);
  }
};

async function findByInformes (idInformes) {
    const [rows, fields] = await pool.execute(`SELECT * FROM informes WHERE idInformes = ?` , [idInformes]);
    return rows[0];    throw error;
  }

async function deleteByIdInformes(idInformes) {
    try {
      const [result] = await pool.execute('DELETE FROM informes WHERE idInformes = ?', [idInformes]);
      if (result.affectedRows === 0) {
        throw new Error('El informe no existe');
      }
      return { message: 'informe eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  


module.exports = {Informes     ,
    findByInformes,
    deleteByIdInformes};
