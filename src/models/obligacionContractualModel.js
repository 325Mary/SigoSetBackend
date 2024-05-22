
const mysql = require('mysql2');
const pool = require('../config/database');

const ObligacionesContractuales = {
    getAll: (callback) => {
        pool.query('SELECT * FROM obligaciones_contractuales', callback);
    },

    getById: (id, callback) => {
        pool.query('SELECT * FROM obligaciones_contractuales WHERE id_obligaciones_contractuales = ?', [id], callback);
    },

    create: (data, callback) => {
        pool.query('INSERT INTO obligaciones_contractuales SET ?', data, callback);
    },

    updateById: (id, data, callback) => {
        pool.query('UPDATE obligaciones_contractuales SET ? WHERE id_obligaciones_contractuales = ?', [data, id], callback);
    },

    deleteById: (id, callback) => {
        pool.query('DELETE FROM obligaciones_contractuales WHERE id_obligaciones_contractuales = ?', [id], callback);
    }
};

module.exports = ObligacionesContractuales;