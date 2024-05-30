const obligacionContractualService = require('../services/obligacionContractualService');

const obtenerObligacionesContractuales = async(req, res) => {
    try {
        const data = await obligacionContractualService.obtenerObligacionesContractuales();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerObligacionContractualPorId = async(req, res) => {
    try {
        const id = req.params.id;
        const data = await obligacionContractualService.obtenerObligacionContractualPorId(id);
        if (data) {
            res.json(data);
        } else {
            res.status(404).json({ message: 'Obligación Contractual no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const crearObligacionContractual = async(req, res) => {
    try {
        const data = req.body;
        const result = await obligacionContractualService.crearObligacionContractual(data);
        res.status(201).json({ message: 'Obligación Contractual creada', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarObligacionContractualPorId = async(req, res) => {
    try {
        const idobligaciones_contractuales = req.params.idobligaciones_contractuales;
        const data = req.body;
        await obligacionContractualService.actualizarObligacionContractualPorId(idobligaciones_contractuales, data);
        res.json({ message: 'Obligación Contractual actualizada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarObligacionContractualPorId = async(req, res) => {
    try {
        const idobligaciones_contractuales = req.params.idobligaciones_contractuales;
        await obligacionContractualService.eliminarObligacionContractualPorId(idobligaciones_contractuales);
        res.json({ message: 'Obligación Contractual eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenerObligacionesContractuales,
    obtenerObligacionContractualPorId,
    crearObligacionContractual,
    actualizarObligacionContractualPorId,
    eliminarObligacionContractualPorId
};