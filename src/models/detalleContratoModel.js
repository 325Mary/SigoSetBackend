const mysql = require('mysql2');


const pool = require('../config/database');

const detalleContrato = {
  findAll: function() {
    return pool.execute(`SELECT 
              dc.*,
              cf.ordenador_gasto AS ordenador_gasto_centro,
              cc.idcentro_formacion,
              oc_contratista.obligacion_contratista,
              oc_contractuales.obligaciones_contractuales,
              e.nombre_empresa
              FROM 
              detalle_contrato dc
              JOIN certificacion_centrof cc ON dc.idcertificacion_centrof = cc.idcertificacion_centrof
              LEFT JOIN centro_formacion cf ON cc.idcentro_formacion = cf.idcentro_formacion
              LEFT JOIN obligaciones_contrato oc ON dc.idobligaciones_contrato = oc.idobligaciones_contrato
              LEFT JOIN obligaciones_contratista oc_contratista ON oc.idobligaciones_contratista = oc_contratista.idobligaciones_contratista
              LEFT JOIN obligaciones_contractuales oc_contractuales ON oc.idobligaciones_contractuales = oc_contractuales.idobligaciones_contractuales
              LEFT JOIN contrato_empresa ce ON oc.idContrato_empresa = ce.idContrato_empresa
              LEFT JOIN empresa e ON ce.idempresa = e.idempresa`); 
  },
  create: function(detalle_contratoData) {
    const { idcertificacion_centrof, idobligaciones_contrato, cumple, nombreDetalleContrato } = detalle_contratoData;
    const sql = `INSERT INTO detalle_contrato (idcertificacion_centrof, idobligaciones_contrato, cumple, nombreDetalleContrato) VALUES (?, ?, ?, ?)`;
    return pool.execute(sql, [idcertificacion_centrof, idobligaciones_contrato, cumple, nombreDetalleContrato]);
  }
};



async function findByDetalle_contrato (iddetalle_contrato) {
    const [rows, fields] = await pool.execute(`SELECT * FROM detalle_contrato WHERE iddetalle_contrato = ?` , [iddetalle_contrato]);
    return rows[0];    throw error;
  }

async function deleteByiDetalle_contrato(iddetalle_contrato) {
    try {
      const [result] = await pool.execute('DELETE FROM detalle_contrato WHERE iddetalle_contrato = ?', [iddetalle_contrato]);
      if (result.affectedRows === 0) {
        throw new Error('El detalle de contrato no existe');
      }
      return { message: 'Detalle de contrato eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  
  async function findByDetalle_contratoxNombre (nombreDetalleContrato) {
    const [rows, fields] = await pool.execute(`SELECT 
              dc.*,
              cf.ordenador_gasto AS ordenador_gasto_centro,
              cc.idcentro_formacion,
              cc.fecha_inicio,
              cc.fecha_fin,
              oc_contratista.obligacion_contratista,
              oc_contractuales.obligaciones_contractuales,
              r.regional,
              e.nombre_empresa
              FROM 
              detalle_contrato dc
              JOIN certificacion_centrof cc ON dc.idcertificacion_centrof = cc.idcertificacion_centrof
              LEFT JOIN centro_formacion cf ON cc.idcentro_formacion = cf.idcentro_formacion
              LEFT JOIN regional r ON cf.idRegional = r.idRegional
              LEFT JOIN obligaciones_contrato oc ON dc.idobligaciones_contrato = oc.idobligaciones_contrato
              LEFT JOIN obligaciones_contratista oc_contratista ON oc.idobligaciones_contratista = oc_contratista.idobligaciones_contratista
              LEFT JOIN obligaciones_contractuales oc_contractuales ON oc.idobligaciones_contractuales = oc_contractuales.idobligaciones_contractuales
              LEFT JOIN contrato_empresa ce ON oc.idContrato_empresa = ce.idContrato_empresa
              LEFT JOIN empresa e ON ce.idempresa = e.idempresa WHERE nombreDetalleContrato = ?` , [nombreDetalleContrato]);
    return rows;    throw error;
  }


module.exports = {detalleContrato     ,
  findByDetalle_contrato,
  deleteByiDetalle_contrato,
  findByDetalle_contratoxNombre
  };
