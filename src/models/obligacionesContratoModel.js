const pool = require('../config/database');

const ObligacionesContrato = {
    findAll: function() {
        return pool.execute(`
            SELECT oc.*, 
       octr.obligacion_contratista, 
       e.nombre_empresa, 
       ce.fecha_inicio, 
       ce.fecha_fin,
       ocont.obligaciones_contractuales
FROM obligaciones_contrato AS oc
LEFT JOIN contrato_empresa AS ce ON oc.idContrato_empresa = ce.idContrato_empresa
LEFT JOIN obligaciones_contratista AS octr ON oc.idobligaciones_contratista = octr.idobligaciones_contratista
LEFT JOIN empresa AS e ON ce.idempresa = e.idempresa
LEFT JOIN obligaciones_contractuales AS ocont ON oc.idobligaciones_contractuales = ocont.idobligaciones_contractuales

        `);
    },

    create: function(obligaciones_contratoData) {
        const { idContrato_empresa, idobligaciones_contratista, idobligaciones_contractuales } = obligaciones_contratoData;
        const sql = 'INSERT INTO obligaciones_contrato (idContrato_empresa, idobligaciones_contratista, idobligaciones_contractuales) VALUES (?, ?, ?)';
        const params = [
            idContrato_empresa !== undefined ? idContrato_empresa : null,
            idobligaciones_contratista !== undefined ? idobligaciones_contratista : null,
            idobligaciones_contractuales !== undefined ? idobligaciones_contractuales : null
        ];
        return pool.execute(sql, params);
    },

    findById: function(idobligaciones_contrato) {
        return pool.execute('SELECT * FROM obligaciones_contrato WHERE idobligaciones_contrato = ?', [idobligaciones_contrato]);
    },

    findByTodo: function(idContrato_empresa, idobligaciones_contratista, idobligaciones_contractuales) {
        const params = [
            idContrato_empresa !== undefined ? idContrato_empresa : null,
            idobligaciones_contratista !== undefined ? idobligaciones_contratista : null,
            idobligaciones_contractuales !== undefined ? idobligaciones_contractuales : null
        ];
        return pool.execute('SELECT * FROM obligaciones_contrato WHERE idContrato_empresa = ? AND idobligaciones_contratista = ? AND idobligaciones_contractuales = ?', params);
    },

    update: function(idobligaciones_contrato, obligaciones_contratoData) {
        const { idContrato_empresa, idobligaciones_contratista, idobligaciones_contractuales } = obligaciones_contratoData;
        const sql = 'UPDATE obligaciones_contrato SET idContrato_empresa = ?, idobligaciones_contratista = ?, idobligaciones_contractuales = ? WHERE idobligaciones_contrato = ?';
        const params = [
            idContrato_empresa !== undefined ? idContrato_empresa : null,
            idobligaciones_contratista !== undefined ? idobligaciones_contratista : null,
            idobligaciones_contractuales !== undefined ? idobligaciones_contractuales : null,
            idobligaciones_contrato
        ];
        return pool.execute(sql, params);
    },

    deleteById: function(idobligaciones_contrato) {
        return pool.execute('DELETE FROM obligaciones_contrato WHERE idobligaciones_contrato = ?', [idobligaciones_contrato]);
    }
};

module.exports = ObligacionesContrato;
