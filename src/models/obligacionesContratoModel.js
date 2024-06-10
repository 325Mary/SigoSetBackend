const pool = require('../config/database');

const ObligacionesContrato = {
    findAll: function() {
        return pool.execute(`SELECT oc.*, 
       octr.obligacion_contratista, 
       e.nombre_empresa, 
       ce.fecha_inicio, 
       ce.fecha_fin
FROM obligaciones_contrato AS oc
INNER JOIN contrato_empresa AS ce ON oc.idContrato_empresa = ce.idContrato_empresa
INNER JOIN obligaciones_contratista AS octr ON oc.idobligaciones_contratista = octr.idobligaciones_contratista
INNER JOIN empresa AS e ON ce.idempresa = e.idempresa;
`)
    },

    create: function(obligaciones_contratoData) {
        const sql = 'INSERT INTO obligaciones_contrato (idContrato_empresa, idobligaciones_contratista) VALUES (?, ?)';
        const { idContrato_empresa, idobligaciones_contratista } = obligaciones_contratoData;
        return pool.execute(sql, [idContrato_empresa, idobligaciones_contratista]);
    },

    findById: function(idobligaciones_contrato) {
        return pool.execute('SELECT * FROM obligaciones_contrato WHERE idobligaciones_contrato = ?', [idobligaciones_contrato]);
    },

    update: function(idobligaciones_contrato, obligaciones_contratoData) {
        const { idContrato_empresa, idobligaciones_contratista } = obligaciones_contratoData;
        const sql = 'UPDATE obligaciones_contrato SET idContrato_empresa = ?, idobligaciones_contratista = ? WHERE idobligaciones_contrato = ?';
        return pool.execute(sql, [idContrato_empresa, idobligaciones_contratista, idobligaciones_contrato]);
    },

    deleteById: function(idobligaciones_contrato) {
        return pool.execute('DELETE FROM obligaciones_contrato WHERE idobligaciones_contrato = ?', [idobligaciones_contrato]);
    }
};

module.exports = ObligacionesContrato;
