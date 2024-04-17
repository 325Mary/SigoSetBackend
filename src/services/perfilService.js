const Perfil = require('../models/perfilModel');

const PerfilService = {
    findAll: async function() {
        try {
            const perfiles = await Perfil.findAll();
            return perfiles;
        } catch (error) {
            throw error;
        }
    },
    findById: async function(id) {
        try {
            const perfil = await Perfil.findById(id);
            return perfil;
        } catch (error) {
            throw error;
        }
    },
    create: async function(perfilData) {
        try {
            const newPerfilId = await Perfil.create(perfilData);
            return newPerfilId;
        } catch (error) {
            throw error;
        }
    },
    update: async function(id, perfilData) {
        try {
            const rowsAffected = await Perfil.update(id, perfilData);
            return rowsAffected;
        } catch (error) {
            throw error;
        }
    },
    deleteById: async function(id) {
        try {
            const rowsAffected = await Perfil.deleteById(id);
            return rowsAffected;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = PerfilService;