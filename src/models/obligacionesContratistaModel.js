const pool = require('../config/database');

const ObligacionesContratista = {
    findAll: async function() {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM obligaciones_contratista');
            return rows;
        } catch (error) {
            throw error;
        }
    },
    findById: async function(id) {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM obligaciones_contratista WHERE idobligaciones_contratista = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    },
    create: async function(obligacionData) {
        try {
            const sql = `INSERT INTO obligaciones_contratista (obligacion_contratista, obligaciones_descripcion) VALUES (?, ?)`;
            const result = await pool.execute(sql, [obligacionData.obligacion_contratista, obligacionData.obligaciones_descripcion]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    },
    update: async function(id, obligacionData) {
        try {
            const sql = `UPDATE obligaciones_contratista SET obligacion_contratista = ?, obligaciones_descripcion = ? WHERE idobligaciones_contratista = ?`;
            const result = await pool.execute(sql, [obligacionData.obligacion_contratista, obligacionData.obligaciones_descripcion, id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    },
    deleteById: async function(id) {
        try {
            const result = await pool.execute('DELETE FROM obligaciones_contratista WHERE idobligaciones_contratista = ?', [id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = ObligacionesContratista;