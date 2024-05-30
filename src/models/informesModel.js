const pool = require('../config/database');

const ObliXcentro = {
  findAll: function(idEmpresa) {
    return pool.execute(`
      SELECT oc.*, octr.obligacion_contratista
      FROM obligaciones_contrato AS oc
      INNER JOIN contrato_empresa AS ce ON oc.idContrato_empresa = ce.idContrato_empresa
      INNER JOIN obligaciones_contratista AS octr ON oc.idobligaciones_contratista = octr.idobligaciones_contratista
      WHERE ce.idempresa = ?;
    `, [idEmpresa]);
  }
}

module.exports = { ObliXcentro };
