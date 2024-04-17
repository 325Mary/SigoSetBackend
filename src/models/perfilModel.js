const pool = require('../config/database');

const Perfil = {
    findAll: async function() {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM perfil');
            return rows;
        } catch (error) {
            throw error;
        }
    },
    findById: async function(id) {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM perfil WHERE idperfil = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    },
    create: async function(perfilData) {
        try {
            const sql = `INSERT INTO perfil (perfil) VALUES (?)`;
            const result = await pool.execute(sql, [perfilData.perfil]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    },
    update: async function(id, perfilData) {
        try {
            const sql = `UPDATE perfil SET perfil = ? WHERE idperfil = ?`;
            const result = await pool.execute(sql, [perfilData.perfil, id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    },
    deleteById: async function(id) {
        try {
            const result = await pool.execute('DELETE FROM perfil WHERE idperfil = ?', [id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Perfil;