const mysql = require('mysql2');


const pool = require('../config/database');

const PuestosTemporales = {
  findAll: async function(idcentro_formacion) {
    try {
      const query = `
        SELECT 
         pt.*, 
          pt.idPuestosTemporales,
          cf.centro_formacion,
          e.nombre_empresa,
          sf.sede_formacion,
          sf.dir_sede_formacion,
          v.descripcion,
          pv.descripcion_puesto AS descripcionVHumana,
          pt.tipo_Puesto,
          pt.cantidad,
          pt.estado,
          pt.fecha_inicio,
          pt.fecha_fin
        FROM 
          puestos_temporales pt
        JOIN 
          centro_formacion cf ON pt.idcentro_formacion = cf.idcentro_formacion
        JOIN 
          empresa e ON pt.idempresa = e.idempresa
        JOIN 
          sede_formacion sf ON pt.idsede_formacion = sf.idsede_formacion
        LEFT JOIN 
          puntosvelectronica ve ON pt.idpuntosvelectronica = ve.idpuntosvelectronica
        LEFT JOIN 
          vigilancia_electronica v ON ve.idvigilancia_electronica = v.idvigilancia_electronica -- Uniendo con vigilancia_electronica para obtener la descripción
        LEFT JOIN 
          puestosvxcentrof px ON pt.idpuestosvxcentrof = px.idpuestosvxcentrof -- Unión con la tabla intermedia
        LEFT JOIN 
          puestos_vigilancia pv ON px.idpuesto_vigilancia = pv.idpuesto_vigilancia -- Unión con puestos_vigilancia
        WHERE 
          pt.idcentro_formacion = ?
      `;
  
      const [rows] = await pool.execute(query, [idcentro_formacion]);
      return rows;
    } catch (error) {
      throw new Error(`Error al ejecutar la consulta: ${error.message}`);
    }
  },
  
  create: function(PuestosTemporalesData) {
    const sql = `INSERT INTO puestos_temporales (idcentro_formacion, idempresa, idsede_formacion, idpuntosvelectronica, idpuestosvxcentrof, tipo_Puesto, cantidad, estado, fecha_inicio, fecha_fin, direccionSedeVHumana, direccionSedeVElectronica, cantidad_puestov) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    return pool.execute(sql, [PuestosTemporalesData.idcentro_formacion, PuestosTemporalesData.idempresa, PuestosTemporalesData.idsede_formacion, PuestosTemporalesData.idpuntosvelectronica, PuestosTemporalesData.idpuestosvxcentrof, PuestosTemporalesData.tipo_Puesto, PuestosTemporalesData.cantidad, PuestosTemporalesData.estado, PuestosTemporalesData.fecha_inicio, PuestosTemporalesData.fecha_fin, PuestosTemporalesData.direccionSedeVHumana, PuestosTemporalesData.direccionSedeVElectronica, PuestosTemporalesData.cantidad_puestov]);
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
