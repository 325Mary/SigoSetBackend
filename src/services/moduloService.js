const Modulo = require('../models/moduloModel');

const ModuloService = {
    findAll: async function() {
        try {
            const modulos = await Modulo.findAll();
            return modulos;
        } catch (error) {
            throw error;
        }
    },
    findById: async function(idmodulo) {
        try {
            const modulo = await Modulo.findById(idmodulo);
            return modulo;
        } catch (error) {
            throw error;
        }
    },
    create: async function(moduloData) {
        try {
            const newModuloId = await Modulo.create(moduloData);
            return newModuloId;
        } catch (error) {
            throw error;
        }
    },
    update: async function(idmodulo, moduloData) {
        try {
            const rowsAffected = await Modulo.update(idmodulo, moduloData);
            return rowsAffected;
        } catch (error) {
            throw error;
        }
    },
    deleteById: async function(idmodulo) {
        try {
            const rowsAffected = await Modulo.deleteById(idmodulo);
            return rowsAffected;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = ModuloService;

// const Modulo = require('../models/moduloModel');

// const ModuloService = {
//     findAll: async function() {
//         try {
//             const modulos = await Modulo.findAll();
//             return modulos;
//         } catch (error) {
//             throw error;
//         }
//     },
//     findById: async function(idmodulo) {
//         try {
//             const modulo = await Modulo.findById(idmodulo);
//             return modulo;
//         } catch (error) {
//             throw error;
//         }
//     },
//     create: async function(moduloData) {
//         try {
//             if (!moduloData || !moduloData.modulo || !moduloData.url_modulo || !moduloData.icono || !moduloData.orden || !moduloData.hijos) {
//                 throw new Error("Faltan datos obligatorios para crear el módulo.");
//             }

//             const newModuloId = await Modulo.create(moduloData);
//             return newModuloId;
//         } catch (error) {
//             throw error;
//         }
//     },
//     update: async function(idmodulo, moduloData) {
//         try {
//             const rowsAffected = await Modulo.update(idmodulo, moduloData);
//             return rowsAffected;
//         } catch (error) {
//             throw error;
//         }
//     },
//     deleteById: async function(idmodulo) {
//         try {
//             const rowsAffected = await Modulo.deleteById(idmodulo);
//             return rowsAffected;
//         } catch (error) {
//             throw error;
//         }
//     }
// };

// module.exports = ModuloService;