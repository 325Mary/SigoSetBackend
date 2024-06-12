const pool = require('../config/database');

const Municipio = {
    findAll: function() {
        return pool.execute('SELECT * FROM municipio');
    },
    findById: function(id) {
        return pool.execute('SELECT * FROM municipio WHERE idmunicipio = ?', [id]);
    },
    create: function(municipioData) {
        const sql = `INSERT INTO municipio (iddepartamento, municipio) VALUES (?, ?)`;
        return pool.execute(sql, [municipioData.iddepartamento, municipioData.municipio]);
    },
    update: function(id, municipioData) {
        const sql = `UPDATE municipio SET iddepartamento = ?, municipio = ? WHERE idmunicipio = ?`;
        return pool.execute(sql, [municipioData.iddepartamento, municipioData.municipio, id]);
    },
    deleteById: function(id) {
        return pool.execute('DELETE FROM municipio WHERE idmunicipio = ?', [id]);
    },
    searchByName: function(nombre) {
        return pool.execute('SELECT * FROM municipio WHERE municipio LIKE ?', [`%${nombre}%`]);
    }
};

module.exports = Municipio;