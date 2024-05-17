const mysql = require('mysql2');
const pool = require('../config/database');

const Puestos = {
  createPuestosVxCentro: function(  puestosvigilanciaXcentroData) {
    const sql = `INSERT INTO puestosvxcentrof ( idcentro_formacion,  idpuesto_vigilancia, cantidad_puestov) VALUES (  ?, ?, ?)`;
    return pool.execute(sql, [ puestosvigilanciaXcentroData.idcentro_formacion, puestosvigilanciaXcentroData.idpuesto_vigilancia , puestosvigilanciaXcentroData.cantidad_puestov]);
  },
 

  findAll: function() {
    return pool.execute('SELECT * FROM puestos_vigilancia');
  },
  findAllPuestosXcentro: function(idcentro_formacion) {
    return pool.execute(`
      SELECT pvc.*, cf.centro_formacion AS centro_formacion, e.nombre_empresa AS nombre_empresa, pv.descripcion_puesto AS descripcion_puesto
      FROM puestosvxcentrof pvc
      INNER JOIN centro_formacion cf ON pvc.idcentro_formacion = cf.idcentro_formacion
      INNER JOIN empresa e ON pvc.idempresa = e.idempresa
      INNER JOIN puestos_vigilancia pv ON pvc.idpuesto_vigilancia = pv.idpuesto_vigilancia
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
      SELECT pvc.*, cf.centro_formacion AS centro_formacion, e.nombre_empresa AS nombre_empresa, pv.descripcion AS descripcion
      FROM puntosvelectronica pvc
      INNER JOIN centro_formacion cf ON pvc.idcentro_formacion = cf.idcentro_formacion
      INNER JOIN empresa e ON pvc.idempresa = e.idempresa
      INNER JOIN vigilancia_electronica pv ON pvc.idvigilancia_electronica = pv.idvigilancia_electronica
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
    const sql = `INSERT INTO puntosvelectronica (idcentro_formacion, idvigilancia_electronica, cantidad) VALUES (?, ?, ?)`;
    return pool.execute(sql, [puntosvelectronicaData.idcentro_formacion, puntosvelectronicaData.idvigilancia_electronica, puntosvelectronicaData.cantidad]);
}
async function findByPuestosV (idpuestosvxcentrof) {
  const [rows, fields] = await pool.execute(`SELECT * FROM puestosvxcentrof WHERE idpuestosvxcentrof = ?` , [idpuestosvxcentrof]);
  return rows[0];    throw error;
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
