// const PuestoVigilancia = require('../models/puestosVigilanciaModel');

// const obtenerPuestos = async() => {
//     try {
//         const puestos = await PuestoVigilancia.findAll();
//         return puestos;
//     } catch (error) {
//         throw error;
//     }
// };

// const obtenerPuestoPorId = async(id) => {
//     try {
//         const puesto = await PuestoVigilancia.findById(id);
//         return puesto;
//     } catch (error) {
//         throw error;
//     }
// };

// const crearPuesto = async(puestoData) => {
//     try {
//         const nuevoPuesto = await PuestoVigilancia.create(puestoData);
//         return nuevoPuesto;
//     } catch (error) {
//         throw error;
//     }
// };

// const editarPuesto = async(id, nuevoPuestoData) => {
//     try {
//         const puestoEditado = await PuestoVigilancia.update(id, nuevoPuestoData);
//         return puestoEditado;
//     } catch (error) {
//         throw error;
//     }
// };

// const eliminarPuesto = async(id) => {
//     try {
//         await PuestoVigilancia.deleteById(id);
//     } catch (error) {
//         throw error;
//     }
// };

// module.exports = {
//     obtenerPuestos,
//     obtenerPuestoPorId,
//     crearPuesto,
//     editarPuesto,
//     eliminarPuesto
// };
const PuestoVigilancia = require('../models/puestosVigilanciaModel');

const obtenerPuestos = async() => {
    try {
        const puestos = await PuestoVigilancia.findAll();
        return puestos;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener puestos de vigilancia');
    }
};

const obtenerPuestoPorId = async(id) => {
    try {
        const puesto = await PuestoVigilancia.findById(id);
        if (!puesto) {
            throw new Error('Puesto de vigilancia no encontrado');
        }
        return puesto;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener puesto de vigilancia');
    }
};

const crearPuesto = async(puestoData) => {
    if (!puestoData || !puestoData.descripcion_puesto || !puestoData.tarifa_puesto || !puestoData.ays) {
        throw new Error('Faltan datos obligatorios para crear el puesto.');
    }

    const iva = puestoData.tarifa_puesto * 0.19;
    const total = puestoData.tarifa_puesto + puestoData.ays + iva;

    try {
        const nuevoPuesto = await PuestoVigilancia.create(puestoData);
        return nuevoPuesto;
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear puesto de vigilancia');
    }
};

const editarPuesto = async(id, nuevoPuestoData) => {
    if (!nuevoPuestoData || !nuevoPuestoData.descripcion_puesto || !nuevoPuestoData.tarifa_puesto || !nuevoPuestoData.ays) {
        throw new Error('Faltan datos obligatorios para actualizar el puesto.');
    }

    const iva = nuevoPuestoData.tarifa_puesto * 0.19;
    const total = nuevoPuestoData.tarifa_puesto + nuevoPuestoData.ays + iva;

    try {
        const puestoEditado = await PuestoVigilancia.update(id, nuevoPuestoData);
        return puestoEditado;
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar puesto de vigilancia');
    }
};

const eliminarPuesto = async(id) => {
    try {
        await PuestoVigilancia.deleteById(id);
        return { message: 'Puesto de vigilancia eliminado con éxito' };
    } catch (error) {
        console.error(error);
        throw new Error('Error al eliminar puesto de vigilancia');
    }
};

module.exports = {
    obtenerPuestos,
    obtenerPuestoPorId,
    crearPuesto,
    editarPuesto,
    eliminarPuesto
};