// const pool = require('../config/database');

// const PuestoVigilancia = {
//     findAll: function() {
//         return pool.execute('SELECT * FROM puestos_vigilancia');
//     },
//     findById: function(id) {
//         return pool.execute('SELECT * FROM puestos_vigilancia WHERE idpuesto_vigilancia = ?', [id]);
//     },
//     create: function(puestoData) {
//         if (!puestoData || !puestoData.descripcion_puesto || !puestoData.tarifa_puesto || !puestoData.ays || !puestoData.iva || !puestoData.total) {
//             throw new Error("Faltan datos obligatorios para crear el puesto.");
//         }

//         const sql = `INSERT INTO puestos_vigilancia (descripcion_puesto, tarifa_puesto, ays, iva, total) VALUES (?, ?, ?, ?, ?)`;
//         return pool.execute(sql, [puestoData.descripcion_puesto, puestoData.tarifa_puesto, puestoData.ays, puestoData.iva, puestoData.total]);
//     },
//     update: function(id, puestoData) {
//         const sql = `UPDATE puestos_vigilancia SET descripcion_puesto = ?, tarifa_puesto = ?, ays = ?, iva = ?, total = ? WHERE idpuesto_vigilancia = ?`;
//         return pool.execute(sql, [puestoData.descripcion_puesto, puestoData.tarifa_puesto, puestoData.ays, puestoData.iva, puestoData.total, id]);
//     },
//     deleteById: function(id) {
//         return pool.execute('DELETE FROM puestos_vigilancia WHERE idpuesto_vigilancia = ?', [id]);
//     }
// };

// module.exports = PuestoVigilancia;

const pool = require('../config/database');

const PuestoVigilancia = {
    findAll: function() {
        return pool.query('SELECT * FROM puestos_vigilancia');
    },
    findById: function(id) {
        return pool.query('SELECT * FROM puestos_vigilancia WHERE idpuesto_vigilancia = ?', [id]);
    },
    create: function(puestoData) {
        if (!puestoData || !puestoData.descripcion_puesto || !puestoData.tarifa_puesto || !puestoData.ays) {
            throw new Error("Faltan datos obligatorios para crear el puesto.");
        }

        const sql = `INSERT INTO puestos_vigilancia (descripcion_puesto, tarifa_puesto, ays, iva, total) VALUES (?, ?, ?, ?, ?)`;
        return pool.query(sql, [puestoData.descripcion_puesto, puestoData.tarifa_puesto, puestoData.ays, puestoData.iva, puestoData.total]);
    },
    update: function(id, puestoData) {
        const sql = `UPDATE puestos_vigilancia SET descripcion_puesto = ?, tarifa_puesto = ?, ays = ?, iva = ?, total = ? WHERE idpuesto_vigilancia = ?`;
        return pool.query(sql, [puestoData.descripcion_puesto, puestoData.tarifa_puesto, puestoData.ays, puestoData.iva, puestoData.total, id]);
    },
    deleteById: function(id) {
        return pool.query('DELETE FROM puestos_vigilancia WHERE idpuesto_vigilancia = ?', [id]);
    }
};

module.exports = PuestoVigilancia;