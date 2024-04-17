// const PuestosVigilancia = require('../models/puestosVigilanciaModel');

// const crearPuestoVig = async(puestoVigData) => {
//     try {
//         if (!puestoVigData || !puestoVigData.nombrePuestoVig || !puestoVigData.descripcion_puesto || !puestoVigData.tarifa_puesto || !puestoVigData.ays || !puestoVigData.iva || !puestoVigData.total) {
//             throw new Error('Faltan datos del puesto de vigilancia');
//         }

//         const nuevoPuestoVig = await PuestosVigilancia.create(puestoVigData);
//         return nuevoPuestoVig;
//     } catch (error) {
//         throw error;
//     }
// };

// const obtenerPuestosVig = async() => {
//     try {
//         const puestosVig = await PuestosVigilancia.findAll();
//         return puestosVig;
//     } catch (error) {
//         throw error;
//     }
// };

// const getPuestoVigById = async(idPuestoVig) => {
//     try {
//         const puestoVig = await PuestosVigilancia.findByPk(idPuestoVig);
//         if (!puestoVig) {
//             throw new Error('El puesto de vigilancia no existe');
//         }
//         return puestoVig;
//     } catch (error) {
//         throw error;
//     }
// };

// const editarPuestoVig = async(idPuestoVig, nuevoPuestoVigData) => {
//     try {
//         const puestoVigExistente = await getPuestoVigById(idPuestoVig);
//         if (!puestoVigExistente) {
//             throw new Error('El puesto de vigilancia no existe');
//         }

//         const puestoVigActualizado = {...puestoVigExistente, ...nuevoPuestoVigData };
//         await puestoVigExistente.update(puestoVigActualizado);
//         return puestoVigActualizado;
//     } catch (error) {
//         throw error;
//     }
// };

// const eliminarPuestoVig = async(idPuestoVig) => {
//     try {
//         await PuestosVigilancia.destroy({ where: { idpuesto_vigilancia: idPuestoVig } });
//         return { message: 'Puesto de vigilancia eliminado exitosamente' };
//     } catch (error) {
//         throw error;
//     }
// };

// module.exports = {
//     crearPuestoVig,
//     obtenerPuestosVig,
//     getPuestoVigById,
//     editarPuestoVig,
//     eliminarPuestoVig,
// };
// services/puestoVigilanciaService.js
const PuestoVigilancia = require('../models/puestosVigilanciaModel');

const obtenerPuestos = async() => {
    try {
        const puestos = await PuestoVigilancia.findAll();
        return puestos;
    } catch (error) {
        throw error;
    }
};

const obtenerPuestoPorId = async(id) => {
    try {
        const puesto = await PuestoVigilancia.findById(id);
        return puesto;
    } catch (error) {
        throw error;
    }
};

const crearPuesto = async(puestoData) => {
    try {
        const nuevoPuesto = await PuestoVigilancia.create(puestoData);
        return nuevoPuesto;
    } catch (error) {
        throw error;
    }
};

const editarPuesto = async(id, nuevoPuestoData) => {
    try {
        const puestoEditado = await PuestoVigilancia.update(id, nuevoPuestoData);
        return puestoEditado;
    } catch (error) {
        throw error;
    }
};

const eliminarPuesto = async(id) => {
    try {
        await PuestoVigilancia.deleteById(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    obtenerPuestos,
    obtenerPuestoPorId,
    crearPuesto,
    editarPuesto,
    eliminarPuesto
};