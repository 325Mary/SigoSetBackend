const ModuloXPerfil = require('../models/moduloxperfilModel');

const ModuloXPerfilService = {
    findAll: async function() {
        try {
            const modulosxperfiles = await ModuloXPerfil.findAll();
            return modulosxperfiles;
        } catch (error) {
            throw error;
        }
    },
    findById: async function(idModulo, idPerfil) {
        try {
            const moduloxperfil = await ModuloXPerfil.findById(idModulo, idPerfil);
            return moduloxperfil;
        } catch (error) {
            throw error;
        }
    },
    create: async function(moduloxperfilData) {
        try {
            const newModuloXPerfilId = await ModuloXPerfil.create(moduloxperfilData);
            return newModuloXPerfilId;
        } catch (error) {
            throw error;
        }
    },
    update: async function(idModulo, idPerfil, moduloxperfilData) {
        try {
            const rowsAffected = await ModuloXPerfil.update(idModulo, idPerfil, moduloxperfilData);
            return rowsAffected;
        } catch (error) {
            throw error;
        }
    },
    deleteById: async function(idModulo, idPerfil) {
        try {
            const rowsAffected = await ModuloXPerfil.deleteById(idModulo, idPerfil);
            return rowsAffected;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = ModuloXPerfilService;