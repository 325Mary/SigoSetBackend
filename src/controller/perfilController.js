const PerfilService = require('../services/perfilService');

const PerfilController = {
    findAll: async function(req, res, next) {
        try {
            const perfiles = await PerfilService.findAll();
            res.status(200).json(perfiles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    findById: async function(req, res, next) {
        try {
            const id = req.params.id;
            const perfil = await PerfilService.findById(id);
            if (!perfil) {
                res.status(404).json({ message: 'Perfil no encontrado' });
            } else {
                res.status(200).json(perfil);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async function(req, res, next) {
        try {
            const perfilData = req.body;
            const newPerfilId = await PerfilService.create(perfilData);
            res.status(201).json({ message: 'Perfil creado exitosamente', id: newPerfilId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async function(req, res, next) {
        try {
            const id = req.params.id;
            const perfilData = req.body;
            const rowsAffected = await PerfilService.update(id, perfilData);
            if (rowsAffected === 0) {
                res.status(404).json({ message: 'Perfil no encontrado' });
            } else {
                res.status(200).json({ message: 'Perfil actualizado exitosamente' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteById: async function(req, res, next) {
        try {
            const id = req.params.id;
            const rowsAffected = await PerfilService.deleteById(id);
            if (rowsAffected === 0) {
                res.status(404).json({ message: 'Perfil no encontrado' });
            } else {
                res.status(200).json({ message: 'Perfil eliminado exitosamente' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = PerfilController;