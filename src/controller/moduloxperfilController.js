const ModuloXPerfilService = require('../services/moduloxperfilService');

const ModuloXPerfilController = {
    findAll: async function(req, res, next) {
        try {
            const modulosxperfiles = await ModuloXPerfilService.findAll();
            res.status(200).json(modulosxperfiles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    findById: async function(req, res, next) {
        try {
            const idModulo = req.params.idmodulo;
            const idPerfil = req.params.idperfil;
            const moduloxperfil = await ModuloXPerfilService.findById(idModulo, idPerfil);
            if (!moduloxperfil) {
                res.status(404).json({ message: 'Relación Modulo-Perfil no encontrada' });
            } else {
                res.status(200).json(moduloxperfil);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async function(req, res, next) {
        try {
            const moduloxperfilData = req.body;
            const newModuloXPerfilId = await ModuloXPerfilService.create(moduloxperfilData);
            res.status(201).json({ message: 'Relación Modulo-Perfil creada exitosamente', id: newModuloXPerfilId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async function(req, res, next) {
        try {
            const idModulo = req.params.idmodulo;
            const idPerfil = req.params.idperfil;
            const moduloxperfilData = req.body;
            const rowsAffected = await ModuloXPerfilService.update(idModulo, idPerfil, moduloxperfilData);
            if (rowsAffected === 0) {
                res.status(404).json({ message: 'Relación Modulo-Perfil no encontrada' });
            } else {
                res.status(200).json({ message: 'Relación Modulo-Perfil actualizada exitosamente' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteById: async function(req, res, next) {
        try {
            const idModulo = req.params.idmodulo;
            const idPerfil = req.params.idperfil;
            const rowsAffected = await ModuloXPerfilService.deleteById(idModulo, idPerfil);
            if (rowsAffected === 0) {
                res.status(404).json({ message: 'Relación Modulo-Perfil no encontrada' });
            } else {
                res.status(200).json({ message: 'Relación Modulo-Perfil eliminada exitosamente' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = ModuloXPerfilController;