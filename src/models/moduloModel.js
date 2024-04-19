// const pool = require('../config/database');

// const Modulo = {
//     findAll: async function() {
//         try {
//             const [rows, fields] = await pool.execute('SELECT * FROM modulo');
//             return rows;
//         } catch (error) {
//             throw error;
//         }
//     },
//     findById: async function(idmodulo) {
//         try {
//             const [rows, fields] = await pool.execute('SELECT * FROM modulo WHERE idmodulo = ?', [idmodulo]);
//             return rows[0];
//         } catch (error) {
//             throw error;
//         }
//     },
//     create: async function(moduloData) {
//         try {
//             const sql = `INSERT INTO modulo (id_modulo_padre, modulo, url_modulo, icono, orden, hijos) VALUES (?, ?, ?, ?, ?, ?,?)`;
//             const result = await pool.execute(sql, [
//                 moduloData.id_modulo_padre,
//                 moduloData.modulo,
//                 moduloData.url_modulo,
//                 moduloData.icono,
//                 moduloData.orden,
//                 moduloData.hijos
//             ]);
//             return result.insertId;
//         } catch (error) {
//             throw error;
//         }
//     },
//     update: async function(idmodulo, moduloData) {
//         try {
//             const sql = `UPDATE modulo SET id_modulo_padre = ?, modulo = ?, url_modulo = ?, icono = ?, orden = ?, hijos = ? WHERE idmodulo = ?`;
//             const result = await pool.execute(sql, [
//                 moduloData.id_modulo_padre,
//                 moduloData.modulo,
//                 moduloData.url_modulo,
//                 moduloData.icono,
//                 moduloData.orden,
//                 moduloData.hijos,
//                 idmodulo
//             ]);
//             return result.affectedRows;
//         } catch (error) {
//             throw error;
//         }
//     },
//     deleteById: async function(idmodulo) {
//         try {
//             const result = await pool.execute('DELETE FROM modulo WHERE idmodulo = ?', [idmodulo]);
//             return result.affectedRows;
//         } catch (error) {
//             throw error;
//         }
//     }
// };

// module.exports = Modulo;

const pool = require('../config/database');

const Modulo = {
    findAll: async function() {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM modulo');
            return rows;
        } catch (error) {
            throw error;
        }
    },
    findById: async function(idmodulo) {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM modulo WHERE idmodulo = ?', [idmodulo]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    },
    create: async function(moduloData) {
        try {
            const sql = `INSERT INTO modulo (modulo,id_modulo_padre,  url_modulo, icono, orden, hijos) VALUES (?, ?, ?, ?, ?, ?)`;
            const result = await pool.execute(sql, [
                moduloData.modulo,
                moduloData.id_modulo_padre,
                moduloData.url_modulo,
                moduloData.icono,
                moduloData.orden,
                moduloData.hijos
            ]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    },
    update: async function(idmodulo, moduloData) {
        try {
            const sql = `UPDATE modulo SET modulo = ?, id_modulo_padre = ?, url_modulo = ?, icono = ?, orden = ?, hijos = ? WHERE idmodulo = ?`;
            const result = await pool.execute(sql, [
                moduloData.modulo,
                moduloData.id_modulo_padre,
                moduloData.url_modulo,
                moduloData.icono,
                moduloData.orden,
                moduloData.hijos,
                idmodulo
            ]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    },
    deleteById: async function(idmodulo) {
        try {
            const result = await pool.execute('DELETE FROM modulo WHERE idmodulo = ?', [idmodulo]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Modulo;