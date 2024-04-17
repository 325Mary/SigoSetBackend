// const validarCamposRequeridos = require("../middleware/camposrequeridosPuestVig.js");
// const { validationResult } = require('express-validator'); // Assuming validation rules are defined elsewhere
// const {
//     crearPuestoVig,
//     obtenerPuestosVig,
//     getPuestoVigById,
//     editarPuestoVig,
//     eliminarPuestoVig,
// } = require("../services/puestosVigilanciaService")

// const controller = {};
// controller.crearPuestoVigC = async(req, res, next) => {
//     try {
//         validarCamposRequeridos(req, res, ['nombrePuestoVig', 'descripcion_puesto', 'tarifa_puesto', 'ays', 'iva', 'total']);

//         const puestoVigData = {
//             nombrePuestoVig: req.body.nombrePuestoVig,
//             descripcion_puesto: req.body.descripcion_puesto,
//             tarifa_puesto: req.body.tarifa_puesto,
//             ays: req.body.ays,
//             iva: req.body.iva,
//             total: req.body.total,
//         };

//         const nuevoPuestoVig = await crearPuestoVig(puestoVigData);
//         res.status(201).json({ message: 'Puesto de vigilancia creado exitosamente', nuevoPuestoVig });
//     } catch (error) {
//         next(error);
//     }
// };


// controller.obtenerPuestosVigC = async(req, res, next) => {
//     try {
//         const puestosVig = await obtenerPuestosVig();
//         res.status(200).json({ puestosVig });
//     } catch (error) {
//         next(error);
//     }
// };

// controller.getPuestoVigByIdC = async(req, res, next) => {
//     try {
//         const idPuestoVig = parseInt(req.params.idPuestoVig, 10);
//         const puestoVig = await getPuestoVigById(idPuestoVig);
//         if (!puestoVig) {
//             return res.status(404).json({ message: 'El puesto de vigilancia no existe' });
//         }
//         res.status(200).json({ puestoVig });
//     } catch (error) {
//         next(error);
//     }
// };

// controller.editarPuestoVigC = async(req, res, next) => {
//     try {
//         validarCamposRequeridos(req, res, ['idpuesto_vigilancia', 'nombrePuestoVig', 'descripcion_puesto', 'tarifa_puesto', 'ays', 'iva', 'total']);

//         const idPuestoVig = parseInt(req.body.idpuesto_vigilancia, 10);
//         const nuevoPuestoVigData = {
//             nombrePuestoVig: req.body.nombrePuestoVig,
//             descripcion_puesto: req.body.descripcion_puesto,
//             tarifa_puesto: req.body.tarifa_puesto,
//             ays: req.body.ays,
//             iva: req.body.iva,
//             total: req.body.total,
//         };

//         const puestoVigActualizado = await editarPuestoVig(idPuestoVig, nuevoPuestoVigData);
//         res.status(200).json({ message: 'Puesto de vigilancia actualizado exitosamente', puestoVigActualizado });
//     } catch (error) {
//         next(error);
//     }
// };

// controller.eliminarPuestoVigC = async(req, res, next) => {
//     try {
//         const idPuestoVig = parseInt(req.params.idPuestoVig, 10);
//         await eliminarPuestoVig(idPuestoVig);
//         res.status(200).json({ message: 'Puesto de vigilancia eliminado exitosamente' });
//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = controller;
// controllers/puestoVigilanciaController.js
const PuestoVigilanciaService = require('../services/puestosVigilanciaService');

const obtenerPuestosC = async(req, res, next) => {
    try {
        const puestos = await PuestoVigilanciaService.obtenerPuestos();
        res.status(200).json({ message: 'Lista de puestos obtenida correctamente', data: puestos });
    } catch (error) {
        next(error);
    }
};

const obtenerPuestoPorIdC = async(req, res, next) => {
    const id = req.params.id;
    try {
        const puesto = await PuestoVigilanciaService.obtenerPuestoPorId(id);
        if (!puesto || puesto.length === 0) {
            return res.status(404).json({ message: 'Puesto no encontrado' });
        }
        res.status(200).json({ message: 'Puesto obtenido correctamente', data: puesto });
    } catch (error) {
        next(error);
    }
};

const crearPuestoC = async(req, res, next) => {
    const puestoData = req.body;
    try {
        const nuevoPuesto = await PuestoVigilanciaService.crearPuesto(puestoData);
        res.status(201).json({ message: 'Puesto creado correctamente', data: nuevoPuesto });
    } catch (error) {
        next(error);
    }
};

const editarPuestoC = async(req, res, next) => {
    const id = req.params.id;
    const nuevoPuestoData = req.body;
    try {
        const puestoEditado = await PuestoVigilanciaService.editarPuesto(id, nuevoPuestoData);
        res.status(200).json({ message: 'Puesto editado correctamente', data: puestoEditado });
    } catch (error) {
        next(error);
    }
};

const eliminarPuestoC = async(req, res, next) => {
    const id = req.params.id;
    try {
        await PuestoVigilanciaService.eliminarPuesto(id);
        res.status(200).json({ message: 'Puesto eliminado correctamente' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    obtenerPuestosC,
    obtenerPuestoPorIdC,
    crearPuestoC,
    editarPuestoC,
    eliminarPuestoC
};