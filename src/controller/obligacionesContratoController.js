const {
    crearObligacionContrato,
    obtenerObligaciones_contrato,
    editarObligacionesContrato,
    eliminarObligacionesContrato
} = require('../services/obligacionesContratoService');
const { ResponseStructure } = require('../helpers/ResponseStructure');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');
const ObligacionesContrato = require('../models/obligacionesContratoModel');

const controller = {}

controller.crearObligacionesContratoC = async (req, res, next) => {
    try {
        const obligaciones_contratoData = req.body;

        // Verificar si la obligación ya existe
        const [rows] = await ObligacionesContrato.findByTodo(
            obligaciones_contratoData.idContrato_empresa,
            obligaciones_contratoData.idobligaciones_contratista,
            obligaciones_contratoData.idobligaciones_contractuales
        );
        
        if (rows.length > 0) {
            return res.status(400).json({ ...ResponseStructure, status: 400, message: 'La obligación ya está registrada' });
        }

        // Crear nueva obligación
        const [result] = await ObligacionesContrato.create(obligaciones_contratoData);
        res.status(201).json({ ...ResponseStructure, message: 'Obligación creada exitosamente', data: result });
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
