// const { Sequelize, DataTypes } = require('sequelize');

// const sequelize = new Sequelize('database_name', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'mysql',
// });

// const PuestosVigilancia = sequelize.define('puestos_vigilancia', {
//     nombrePuestoVig: {
//         type: DataTypes.STRING(70),
//         allowNull: false,
//     },
//     idpuesto_vigilancia: {
//         type: DataTypes.TINYINT,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     descripcion_puesto: {
//         type: DataTypes.STRING(70),
//         allowNull: false,
//     },
//     tarifa_puesto: {
//         type: DataTypes.DECIMAL(4, 0),
//         allowNull: false,
//     },
//     ays: {
//         type: DataTypes.DECIMAL(5, 0),
//         allowNull: false,
//     },
//     iva: {
//         type: DataTypes.DECIMAL(2, 0),
//         allowNull: false,
//     },
//     total: {
//         type: DataTypes.DECIMAL(5, 0),
//         allowNull: false,
//     },
// }, {
//     tableName: 'puestos_vigilancia',
//     timestamps: false,
// });

// module.exports = PuestosVigilancia;

// models/puestoVigilanciaModel.js
const pool = require('../config/database');

const PuestoVigilancia = {
    findAll: function() {
        return pool.execute('SELECT * FROM puestos_vigilancia');
    },
    findById: function(id) {
        return pool.execute('SELECT * FROM puestos_vigilancia WHERE idpuesto_vigilancia = ?', [id]);
    },
    create: function(puestoData) {
        const sql = `INSERT INTO puestos_vigilancia (nombrePuestoVig, descripcion_puesto, tarifa_puesto, ays, iva, total) VALUES (?, ?, ?, ?, ?, ?)`;
        return pool.execute(sql, [puestoData.nombrePuestoVig, puestoData.descripcion_puesto, puestoData.tarifa_puesto, puestoData.ays, puestoData.iva, puestoData.total]);
    },
    update: function(id, puestoData) {
        const sql = `UPDATE puestos_vigilancia SET nombrePuestoVig = ?, descripcion_puesto = ?, tarifa_puesto = ?, ays = ?, iva = ?, total = ? WHERE idpuesto_vigilancia = ?`;
        return pool.execute(sql, [puestoData.nombrePuestoVig, puestoData.descripcion_puesto, puestoData.tarifa_puesto, puestoData.ays, puestoData.iva, puestoData.total, id]);
    },
    deleteById: function(id) {
        return pool.execute('DELETE FROM puestos_vigilancia WHERE idpuesto_vigilancia = ?', [id]);
    }
};

module.exports = PuestoVigilancia;