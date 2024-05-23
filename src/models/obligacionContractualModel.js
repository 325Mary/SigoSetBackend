const mysql = require('mysql2');


const pool = require('../config/database');

const ObligacionesContractuales = {
    getAll: async() => {
        const [rows] = await pool.query('SELECT * FROM obligaciones_contractuales');
        return rows;
    },

    getById: async(id) => {
        const [rows] = await pool.query('SELECT * FROM obligaciones_contractuales WHERE id_obligaciones_contractuales = ?', [id]);
        if (rows.length === 0) {
            throw new Error('obligacion contractual no encontrada');
        }
        return rows[0];
    },

    create: async(data) => {
        const [result] = await pool.query('INSERT INTO obligaciones_contractuales SET ?', data);
        return result;
    },

    updateById: async(id, data) => {
        const [result] = await pool.query('UPDATE obligaciones_contractuales SET ? WHERE id_obligaciones_contractuales = ?', [data, id]);
        return result;
    },

    deleteById: async(id) => {
        const [result] = await pool.query('DELETE FROM obligaciones_contractuales WHERE id_obligaciones_contractuales = ?', [id]);
        return result;
    }
};

module.exports = ObligacionesContractuales;