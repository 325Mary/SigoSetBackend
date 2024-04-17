const ObligacionesContratista = require('../models/obligacionesContratistaModel');

const ObligacionesContratistaService = {
    findAll: async function() {
        try {
            const obligaciones = await ObligacionesContratista.findAll();
            return obligaciones;
        } catch (error) {
            throw error;
        }
    },
    findById: async function(id) {
        try {
            const obligacion = await ObligacionesContratista.findById(id);
            return obligacion;
        } catch (error) {
            throw error;
        }
    },
    create: async function(obligacionData) {
        try {
            const newObligacionId = await ObligacionesContratista.create(obligacionData);
            return newObligacionId;
        } catch (error) {
            throw error;
        }
    },
    update: async function(id, obligacionData) {
        try {
            const rowsAffected = await ObligacionesContratista.update(id, obligacionData);
            return rowsAffected;
        } catch (error) {
            throw error;
        }
    },
    deleteById: async function(id) {
        try {
            const rowsAffected = await ObligacionesContratista.deleteById(id);
            return rowsAffected;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = ObligacionesContratistaService;