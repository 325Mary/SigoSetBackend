// const ModuloService = require('../services/moduloService');

// const ModuloController = {
//     findAll: async function(req, res, next) {
//         try {
//             const modulos = await ModuloService.findAll();
//             res.status(200).json(modulos);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     },
//     findById: async function(req, res, next) {
//         try {
//             const idmodulo = req.params.idmodulo;
//             const modulo = await ModuloService.findById(idmodulo);
//             if (!modulo) {
//                 res.status(404).json({ message: 'Modulo no encontrado' });
//             } else {
//                 res.status(200).json(modulo);
//             }
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     },
//     create: async function(req, res, next) {
//         try {
//             const moduloData = req.body;
//             const newModuloId = await ModuloService.create(moduloData);
//             res.status(201).json({ message: 'Modulo creado exitosamente', id: newModuloId });
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     },
//     update: async function(req, res, next) {
//         try {
//             const idmodulo = req.params.idmodulo;
//             const moduloData = req.body;
//             const rowsAffected = await ModuloService.update(idmodulo, moduloData);
//             if (rowsAffected === 0) {
//                 res.status(404).json({ message: 'Modulo no encontrado' });
//             } else {
//                 res.status(200).json({ message: 'Modulo actualizado exitosamente' });
//             }
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     },
//     deleteById: async function(req, res, next) {
//         try {
//             const idmodulo = req.params.idmodulo;
//             const rowsAffected = await ModuloService.deleteById(idmodulo);
//             if (rowsAffected === 0) {
//                 res.status(404).json({ message: 'Modulo no encontrado' });
//             } else {
//                 res.status(200).json({ message: 'Modulo eliminado exitosamente' });
//             }
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     }
// };

// module.exports = ModuloController;

const ModuloService = require('../services/moduloService');

const ModuloController = {
    findAll: async function(req, res, next) {
        try {
            const modulos = await ModuloService.findAll();
            res.status(200).json(modulos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    findById: async function(req, res, next) {
        try {
            const idmodulo = req.params.idmodulo;
            const modulo = await ModuloService.findById(idmodulo);
            if (!modulo) {
                res.status(404).json({ message: 'Modulo no encontrado' });
            } else {
                res.status(200).json(modulo);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    create: async function(req, res, next) {
        try {
            const moduloData = req.body;
            const newModuloId = await ModuloService.create(moduloData);
            res.status(201).json({ message: 'Modulo creado exitosamente', id: newModuloId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async function(req, res, next) {
        try {
            const idmodulo = req.params.idmodulo;
            const moduloData = req.body;
            const rowsAffected = await ModuloService.update(idmodulo, moduloData);
            if (rowsAffected === 0) {
                res.status(404).json({ message: 'Modulo no encontrado' });
            } else {
                res.status(200).json({ message: 'Modulo actualizado exitosamente' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteById: async function(req, res, next) {
        try {
            const idmodulo = req.params.idmodulo;
            const rowsAffected = await ModuloService.deleteById(idmodulo);
            if (rowsAffected === 0) {
                res.status(404).json({ message: 'Modulo no encontrado' });
            } else {
                res.status(200).json({ message: 'Modulo eliminado exitosamente' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = ModuloController;