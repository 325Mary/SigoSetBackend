const {
    crearObligacionContrato,
    obtenerObligaciones_contrato,
    editarObligacionesContrato,
    eliminarObligacionesContrato
} = require('../services/obligacionesContratoService');
const { ResponseStructure } = require('../helpers/ResponseStructure');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');

const controller = {}

controller.crearObligacionesContratoC = async (req, res, next) => {
    try {
        validarCamposRequeridos(['idContrato_empresa', 'idobligaciones_contratista'])(req, res, async () => {
            const obligaciones_contratoData = req.body;
            const ObligacionesContrato = await crearObligacionContrato(obligaciones_contratoData);
            res.status(201).json({ ...ResponseStructure, message: 'obligaciones_contrato creado exitosamente', data: ObligacionesContrato });
        });
    } catch (error) {
        next(error);
    }
};

controller.obtenerObligacionesContratoC = async (req, res, next) => {
    try {
        const listObligacionesContrato = await obtenerObligaciones_contrato();
        res.status(200).json({ ...ResponseStructure, data: listObligacionesContrato });
    } catch (error) {
        res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se obtuvieron los ObligacionesContrato' });
    }
};

controller.editarObligacionesContratoC = async (req, res, next) => {
    try {
        const idobligaciones_contrato = req.params.idobligaciones_contrato;
        const nuevoObligacionesContratoData = req.body;

        if (Object.keys(nuevoObligacionesContratoData).length === 0) {
            return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud está vacío' });
        }

        const camposValidos = ['idContrato_empresa', 'idobligaciones_contratista'];
        const camposRecibidos = Object.keys(nuevoObligacionesContratoData);
        const camposInvalidos = camposRecibidos.filter(field => !camposValidos.includes(field));

        if (camposInvalidos.length > 0) {
            return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud contiene campos no válidos', invalidFields: camposInvalidos });
        }

        const ObligacionesContratoActualizado = await editarObligacionesContrato(idobligaciones_contrato, nuevoObligacionesContratoData);
        res.status(200).json({ ...ResponseStructure, message: 'ObligacionesContrato actualizado exitosamente', data: ObligacionesContratoActualizado });
    } catch (error) {
        res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se actualizó ningún ObligacionesContrato con el ID proporcionado' });
    }
};

controller.eliminarObligacionesContratoC = async (req, res, next) => {
    try {
        const idobligaciones_contrato = req.params.idobligaciones_contrato;
        await eliminarObligacionesContrato(idobligaciones_contrato);
        res.status(200).json({ ...ResponseStructure, message: 'ObligacionesContrato eliminado exitosamente' });
    } catch (error) {
        res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ningún ObligacionesContrato con el ID ${req.params.idobligaciones_contrato} proporcionado` });
    }
};

module.exports = controller;
