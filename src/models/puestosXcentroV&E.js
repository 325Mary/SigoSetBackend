const mysql = require('mysql2');
const pool = require('../config/database');

const Puestos = {
  createPuestosVxCentro: function(  puestosvigilanciaXcentroData) {
    const sql = `INSERT INTO puestosvxcentrof ( idcentro_formacion, idempresa, idpuesto_vigilancia, cantidad_puestov, idsede_formacion) VALUES ( ?, ?, ?, ?, ?)`;
    return pool.execute(sql, [ puestosvigilanciaXcentroData.idcentro_formacion,puestosvigilanciaXcentroData.idempresa, puestosvigilanciaXcentroData.idpuesto_vigilancia , puestosvigilanciaXcentroData.cantidad_puestov, puestosvigilanciaXcentroData.idsede_formacion]);
  },
 

  findAll: function() {
    return pool.execute('SELECT * FROM puestos_vigilancia');
  },
  findAllPuestosXcentro: function(idcentro_formacion) {
    return pool.execute(`
      SELECT pvc.*, cf.centro_formacion AS centro_formacion, e.nombre_empresa AS nombre_empresa, pv.descripcion_puesto AS descripcion_puesto, s.sede_formacion AS sede_formacion, s.dir_sede_formacion AS direccionSede
      FROM puestosvxcentrof pvc
      INNER JOIN centro_formacion cf ON pvc.idcentro_formacion = cf.idcentro_formacion
      INNER JOIN empresa e ON pvc.idempresa = e.idempresa
      INNER JOIN puestos_vigilancia pv ON pvc.idpuesto_vigilancia = pv.idpuesto_vigilancia
      INNER  JOIN sede_formacion s ON pvc.idsede_formacion = s.idsede_formacion
      WHERE pvc.idcentro_formacion = ?
    `, [idcentro_formacion])
    .then(([rows, fields]) => {
      if (rows.length === 0) {
        throw new Error('No se encontraron puestos para el centro de formación especificado.');
      }
      return rows;
    });
  },

findAllPuestosElectronicosXcentro: function(idcentro_formacion) {
    return pool.execute(`
      SELECT pvc.*, cf.centro_formacion AS centro_formacion, e.nombre_empresa AS nombre_empresa, pv.descripcion AS descripcion, s.sede_formacion AS sede_formacion, s.dir_sede_formacion AS direccionSede
      FROM puntosvelectronica pvc
      INNER JOIN centro_formacion cf ON pvc.idcentro_formacion = cf.idcentro_formacion
      INNER JOIN empresa e ON pvc.idempresa = e.idempresa
      INNER JOIN vigilancia_electronica pv ON pvc.idvigilancia_electronica = pv.idvigilancia_electronica
      INNER JOIN sede_formacion s ON pvc.idsede_formacion = s.idsede_formacion
      WHERE pvc.idcentro_formacion = ?
    `, [idcentro_formacion])
    .then(([rows, fields]) => {
      if (rows.length === 0) {
        throw new Error('No se encontraron puestos electrónicos para el centro de formación especificado.');
      }
      return rows;
    });
  },
}
  
 async function createPuestosVExCentro (puntosvelectronicaData) {
    const sql = `INSERT INTO puntosvelectronica (idcentro_formacion, idempresa, idvigilancia_electronica, cantidad, idsede_formacion) VALUES (?, ?, ?, ?, ?)`;
    return pool.execute(sql, [puntosvelectronicaData.idcentro_formacion, puntosvelectronicaData.idempresa, puntosvelectronicaData.idvigilancia_electronica, puntosvelectronicaData.cantidad, puntosvelectronicaData.idsede_formacion]);
}
async function findByPuestosV(idpuestosvxcentrof) {
  try {
    const [rows, fields] = await pool.execute(`SELECT * FROM puestosvxcentrof WHERE idpuestosvxcentrof = ?`, [idpuestosvxcentrof]);
    return rows.length > 0 ? rows[0] : null; // Devuelve la fila encontrada o null si no se encuentra ninguna fila
  } catch (error) {
    throw error; // Propaga el error hacia arriba
  }
}

async function deleteByPuestosV(idpuestosvxcentrof) {
  try {
    const [result] = await pool.execute('DELETE FROM puestosvxcentrof WHERE idpuestosvxcentrof = ?', [idpuestosvxcentrof]);
    if (result.affectedRows === 0) {
      throw new Error('El puestosvxcentrof no existe');
    }
    return { message: 'puestosvxcentrof eliminado exitosamente' };
  } catch (error) {
    throw error;
  }
}

async function findByPuestosE (idpuntosvelectronica) {
  const [rows, fields] = await pool.execute(`SELECT * FROM puntosvelectronica WHERE idpuntosvelectronica = ?` , [idpuntosvelectronica]);
  return rows[0];    throw error;
}

async function deleteByPuestosE(idpuntosvelectronica) {
  try {
    const [result] = await pool.execute('DELETE FROM puntosvelectronica WHERE idpuntosvelectronica = ?', [idpuntosvelectronica]);
    if (result.affectedRows === 0) {
      throw new Error('El puntosvelectronica no existe');
    }
    return { message: 'puntosvelectronica eliminado exitosamente' };
  } catch (error) {
    throw error;
  }
}



module.exports = { Puestos,
  
  findByPuestosV,
  deleteByPuestosV,
  findByPuestosE,
  deleteByPuestosE,
  createPuestosVExCentro
 };
