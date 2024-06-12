const pool = require('../config/database');

const ObligacionesContrato = {
    findAll: function() {
        return pool.execute(`SELECT oc.*, 
       octr.obligacion_contratista, 
       e.nombre_empresa, 
       ce.fecha_inicio, 
       ce.fecha_fin,
       ocont.obligaciones_contractuales
FROM obligaciones_contrato AS oc
INNER JOIN contrato_empresa AS ce ON oc.idContrato_empresa = ce.idContrato_empresa
INNER JOIN obligaciones_contratista AS octr ON oc.idobligaciones_contratista = octr.idobligaciones_contratista
INNER JOIN empresa AS e ON ce.idempresa = e.idempresa
INNER JOIN obligaciones_contractuales AS ocont On oc.idobligaciones_contractuales = ocont.idobligaciones_contractuales
`)
    },

    create: function(obligaciones_contratoData) {
        const sql = 'INSERT INTO obligaciones_contrato (idContrato_empresa, idobligaciones_contratista, idobligaciones_contractuales) VALUES (?, ?, ?)';
        const { idContrato_empresa, idobligaciones_contratista, idobligaciones_contractuales } = obligaciones_contratoData;
        return pool.execute(sql, [idContrato_empresa, idobligaciones_contratista, idobligaciones_contractuales]);
    },

    findById: function(idobligaciones_contrato) {
        return pool.execute('SELECT * FROM obligaciones_contrato WHERE idobligaciones_contrato = ?', [idobligaciones_contrato]);
    },
    findByTodo: function(idContrato_empresa, idobligaciones_contratista, idobligaciones_contractuales) {
        return pool.execute('SELECT * FROM obligaciones_contrato WHERE idContrato_empresa = ? AND idobligaciones_contratista = ? AND idobligaciones_contractuales = ?', [idContrato_empresa, idobligaciones_contratista, idobligaciones_contractuales]);
    },


    update: function(idobligaciones_contrato, obligaciones_contratoData) {
        const { idContrato_empresa, idobligaciones_contratista, idobligaciones_contractuales } = obligaciones_contratoData;
        const sql = 'UPDATE obligaciones_contrato SET idContrato_empresa = ?, idobligaciones_contratista= ?, idobligaciones_contractuales = ? WHERE idobligaciones_contrato = ?';
        return pool.execute(sql, [idContrato_empresa, idobligaciones_contratista,idobligaciones_contractuales, idobligaciones_contrato]);
    },

    deleteById: function(idobligaciones_contrato) {
        return pool.execute('DELETE FROM obligaciones_contrato WHERE idobligaciones_contrato = ?', [idobligaciones_contrato]);
    }
};

module.exports = ObligacionesContrato;
