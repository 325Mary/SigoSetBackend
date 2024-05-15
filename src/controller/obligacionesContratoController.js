const {
    verTodoObligaciones,
    crearObligacionesContrato,
    verObligacionesContratoPorId,
    actualizarObligacionesContrato,
    eliminarObligacionesContratoPorId
} = require('../services/obligacionesContratoService');

const obligacionesContratoController = {};

obligacionesContratoController.verTodoObligaciones = async(req, res) => {
    try {
        const obligaciones = await verTodoObligaciones();
        res.json(obligaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las obligaciones del contrato' });
    }
};

obligacionesContratoController.verObligacionesContratoPorId = async(req, res) => {
    const id = req.params.id;
    try {
        const obligaciones = await verObligacionesContratoPorId(id);
        if (obligaciones) {
            res.json(obligaciones);
        } else {
            res.status(404).json({ message: 'Obligación del contrato no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la obligación del contrato' });
    }
};

obligacionesContratoController.crearObligacionesContrato = async(req, res) => {
    const obligaciones_contratoData = req.body;
    try {
        const newObligaciones_contrato = await crearObligacionesContrato(obligaciones_contratoData);
        res.status(201).json(newObligaciones_contrato);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la obligación del contrato' });
    }
};

obligacionesContratoController.actualizarObligacionesContrato = async(req, res) => {
    const id = req.params.id;
    const obligaciones_contratoData = req.body;
    try {
        const updatedObligaciones_contrato = await actualizarObligacionesContrato(id, obligaciones_contratoData);
        res.json(updatedObligaciones_contrato);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la obligación del contrato' });
    }
};

obligacionesContratoController.eliminarObligacionesContratoPorId = async(req, res) => {
    const id = req.params.id;
    try {
        await eliminarObligacionesContratoPorId(id);
        res.json({ message: 'Obligación del contrato eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la obligación del contrato' });
    }
};

module.exports = obligacionesContratoController;