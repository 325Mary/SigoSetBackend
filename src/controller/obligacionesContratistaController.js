const ObligacionesContratistaService = require('../services/obligacionesContratistaService');

const ObligacionesContratistaController = {
    findAll: async function(req, res, next) {
        try {
            const obligaciones = await ObligacionesContratistaService.findAll();
            res.status(200).json(obligaciones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    findById: async function(req, res, next) {
        try {
            const id = req.params.id;
            const obligacion = await ObligacionesContratistaService.findById(id);
            if (!obligacion) {
                res.status(404).json({ message: 'Obligación no encontrada' });
            } else {
                res.status(200).json(obligacion);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async function(req, res, next) {
        try {
            const obligacionData = req.body;
            const newObligacionId = await ObligacionesContratistaService.create(obligacionData);
            res.status(201).json({ message: 'Obligación creada exitosamente', id: newObligacionId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async function(req, res, next) {
        try {
            const id = req.params.id;
            const obligacionData = req.body;
            const rowsAffected = await ObligacionesContratistaService.update(id, obligacionData);
            if (rowsAffected === 0) {
                res.status(404).json({ message: 'Obligación no encontrada' });
            } else {
                res.status(200).json({ message: 'Obligación actualizada exitosamente' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteById: async function(req, res, next) {
        try {
            const id = req.params.id;
            const rowsAffected = await ObligacionesContratistaService.deleteById(id);
            if (rowsAffected === 0) {
                res.status(404).json({ message: 'Obligación no encontrada' });
            } else {
                res.status(200).json({ message: 'Obligación eliminada exitosamente' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = ObligacionesContratistaController;