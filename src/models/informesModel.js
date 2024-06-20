const pool = require('../config/database');

const ObliXcentro = {
  findAll: function(idEmpresa) {
    return pool.execute(`
      SELECT oc.*, 
             octr.obligacion_contratista, 
             ocont.obligaciones_contractuales
      FROM obligaciones_contrato AS oc
      INNER JOIN contrato_empresa AS ce ON oc.idContrato_empresa = ce.idContrato_empresa
      INNER JOIN obligaciones_contratista AS octr ON oc.idobligaciones_contratista = octr.idobligaciones_contratista
      INNER JOIN obligaciones_contractuales AS ocont ON oc.idobligaciones_contractuales = ocont.idobligaciones_contractuales
      WHERE ce.idempresa = ?;
    `, [idEmpresa]);
  }
}

module.exports = { ObliXcentro };
