const mysql = require('mysql2');
const pool = require('../config/database');

const ObligacionesContractuales = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM obligaciones_contractuales');
        return rows;
    },

    getById: async (idobligaciones_contractuales) => {
        const [rows] = await pool.query('SELECT * FROM obligaciones_contractuales WHERE idobligaciones_contractuales = ?', [idobligaciones_contractuales]);
        if (rows.length === 0) {
            throw new Error('Obligación contractual no encontrada');
        }
        return rows[0];
    },

    create: async (data) => {
        const [result] = await pool.query('INSERT INTO obligaciones_contractuales SET ?', data);
        return result;
    },

    updateById: async (idobligaciones_contractuales, data) => {
        const [result] = await pool.query('UPDATE obligaciones_contractuales SET obligaciones_contractuales = ? WHERE idobligaciones_contractuales = ?', [data.obligaciones_contractuales, idobligaciones_contractuales]);
        return result;
    },

    deleteById: async (idobligaciones_contractuales) => {
        const [result] = await pool.query('DELETE FROM obligaciones_contractuales WHERE idobligaciones_contractuales = ?', [idobligaciones_contractuales]);
        return result;
    }
};

module.exports = ObligacionesContractuales;
