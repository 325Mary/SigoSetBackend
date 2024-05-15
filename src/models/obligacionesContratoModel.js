const pool = require('../config/database');

const ObligacionesContrato = {
    findAll: function() {
        return pool.execute('SELECT * FROM obligaciones_contrato');
    },

    create: function(obligaciones_contratoData) {
        const sql = 'INSERT INTO obligaciones_contrato (idContrato_empresav, idobligaciones_contratista) VALUES (?, ?)';
        const { idContrato_empresav, idobligaciones_contratista } = obligaciones_contratoData;
        return pool.execute(sql, [idContrato_empresav, idobligaciones_contratista]);
    },

    findById: function(id) {
        return pool.execute('SELECT * FROM obligaciones_contrato WHERE idobligaciones_contrato = ?', [id]);
    },

    update: function(id, obligaciones_contratoData) {
        const { idContrato_empresav, idobligaciones_contratista } = obligaciones_contratoData;
        const sql = 'UPDATE obligaciones_contrato SET idContrato_empresav = ?, idobligaciones_contratista = ? WHERE idobligaciones_contrato = ?';
        return pool.execute(sql, [idContrato_empresav, idobligaciones_contratista, id]);
    },

    deleteById: function(id) {
        return pool.execute('DELETE FROM obligaciones_contrato WHERE idobligaciones_contrato = ?', [id]);
    }
};

module.exports = ObligacionesContrato;