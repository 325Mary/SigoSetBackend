const pool = require('../config/database');

const Regional = {
    findAll: function() {
        return pool.execute('SELECT * FROM Regional');
    },

    createRegional: function(regionalData) {
        const sql = 'INSERT INTO regional (regional, direccion) VALUES (?, ?)';
        return pool.execute(sql, [regionalData.regional, regionalData.direccion]);
    },

    findById: function(id) {
        return pool.execute('SELECT * FROM regional WHERE idRegional = ?', [id]);
    },

    update: function(id, regionalData) {
        const sql = 'UPDATE regional SET regional = ?, direccion = ? WHERE idRegional = ?';
        return pool.execute(sql, [regionalData.regional, regionalData.direccion, id]);
    },

    deleteById: function(id) {
        return pool.execute('DELETE FROM regional WHERE idRegional = ?', [id]);
    }
};

module.exports = Regional;