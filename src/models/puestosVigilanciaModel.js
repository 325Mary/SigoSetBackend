const pool = require('../config/database');

const PuestoVigilancia = {
    findAll: async function() {
        try {
            const result = await pool.query('SELECT * FROM puestos_vigilancia');
            return result.rows;
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener puestos de vigilancia');
        }
    },

    findById: async function(id) {
        try {
            const result = await pool.query('SELECT * FROM puestos_vigilancia WHERE idpuesto_vigilancia = ?', [id]);
            if (result.rows.length === 0) {
                throw new Error('Puesto de vigilancia no encontrado');
            }
            return result.rows[0];
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener puesto de vigilancia');
        }
    },

    create: async function(puestoData) {
        if (!puestoData || !puestoData.descripcion_puesto || !puestoData.tarifa_puesto || !puestoData.ays) {
            throw new Error('Faltan datos obligatorios para crear el puesto.');
        }

        const iva = puestoData.tarifa_puesto * 0.19;
        const total = puestoData.tarifa_puesto + puestoData.ays + iva;

        try {
            const sql = 'INSERT INTO puestos_vigilancia (descripcion_puesto, tarifa_puesto, ays, iva, total) VALUES (?, ?, ?, ?, ?)';
            const values = [puestoData.descripcion_puesto, puestoData.tarifa_puesto, puestoData.ays, iva, total];
            await pool.query(sql, values);
            return { message: 'Puesto de vigilancia creado con éxito' };
        } catch (error) {
            console.error(error);
            throw new Error('Error al crear puesto de vigilancia');
        }
    },

    update: async function(id, puestoData) {
        if (!puestoData || !puestoData.descripcion_puesto || !puestoData.tarifa_puesto || !puestoData.ays) {
            throw new Error('Faltan datos obligatorios para actualizar el puesto.');
        }

        const iva = puestoData.tarifa_puesto * 0.19;
        const total = puestoData.tarifa_puesto + puestoData.ays + iva;

        try {
            const sql = ' UPDATE puestos_vigilancia SET descripcion_puesto = ?, tarifa_puesto = ?, ays = ?, iva = ?, total = ? WHERE idpuesto_vigilancia = ?';
            const values = [puestoData.descripcion_puesto, puestoData.tarifa_puesto, puestoData.ays, iva, total, id];
            await pool.query(sql, values);
            return { message: 'Puesto de vigilancia actualizado con éxito' };
        } catch (error) {
            console.error(error);
            throw new Error('Error al actualizar puesto de vigilancia');
        }
    },

    deleteById: async function(id) {
        try {
            await pool.query('DELETE FROM puestos_vigilancia WHERE idpuesto_vigilancia = ?', [id]);
            return { message: 'Puesto de vigilancia eliminado con éxito' };
        } catch (error) {
            console.error(error);
            throw new Error('Error al eliminar puesto de vigilancia');
        }
    }
};

module.exports = PuestoVigilancia;