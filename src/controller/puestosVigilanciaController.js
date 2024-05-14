// const PuestoVigilanciaService = require('../services/puestosVigilanciaService');

// const obtenerPuestosC = async(req, res, next) => {
//     try {
//         const puestos = await PuestoVigilanciaService.obtenerPuestos();
//         res.status(200).json({ message: 'Lista de puestos obtenida correctamente', data: puestos });
//     } catch (error) {
//         next(error);
//     }
// };

// const obtenerPuestoPorIdC = async(req, res, next) => {
//     const id = req.params.id;
//     try {
//         const puesto = await PuestoVigilanciaService.obtenerPuestoPorId(id);
//         if (!puesto || puesto.length === 0) {
//             return res.status(404).json({ message: 'Puesto no encontrado' });
//         }
//         res.status(200).json({ message: 'Puesto obtenido correctamente', data: puesto });
//     } catch (error) {
//         next(error);
//     }
// };

// const crearPuestoC = async(req, res, next) => {
//     const puestoData = req.body;
//     try {
//         const nuevoPuesto = await PuestoVigilanciaService.crearPuesto(puestoData);
//         res.status(201).json({ message: 'Puesto creado correctamente', data: nuevoPuesto });
//     } catch (error) {
//         next(error);
//     }
// };

// const editarPuestoC = async(req, res, next) => {
//     const id = req.params.id;
//     const nuevoPuestoData = req.body;
//     try {
//         const puestoEditado = await PuestoVigilanciaService.editarPuesto(id, nuevoPuestoData);
//         res.status(200).json({ message: 'Puesto editado correctamente', data: puestoEditado });
//     } catch (error) {
//         next(error);
//     }
// };

// const eliminarPuestoC = async(req, res, next) => {
//     const id = req.params.id;
//     try {
//         await PuestoVigilanciaService.eliminarPuesto(id);
//         res.status(200).json({ message: 'Puesto eliminado correctamente' });
//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = {
//     obtenerPuestosC,
//     obtenerPuestoPorIdC,
//     crearPuestoC,
//     editarPuestoC,
//     eliminarPuestoC
// };const servicio = require('../services/service');

exports.obtenerPuestos = async function(req, res) {
    await servicio.getPuestos(req, res);
};

exports.crearPuesto = async function(req, res) {
    await servicio.createPuesto(req, res);
};

exports.editarPuesto = async function(req, res) {
    await servicio.editPuesto(req, res);
};

exports.eliminarPuesto = async function(req, res) {
    await servicio.deletePuesto(req, res);
};