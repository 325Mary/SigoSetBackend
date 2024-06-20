const ObligacionesContrato = require('../models/obligacionesContratoModel');

async function crearObligacionContrato(obligaciones_contratoData) {
    try {
        if (!obligaciones_contratoData || !obligaciones_contratoData.idContrato_empresa || !obligaciones_contratoData.idobligaciones_contratista || !obligaciones_contratoData.idobligaciones_contractuales ) {
            throw new Error('Faltan datos');
        }

        const nuevoObligaciones_contratista = await ObligacionesContrato.create(obligaciones_contratoData);
        return nuevoObligaciones_contratista;
    } catch (error) {
        throw error;
    }
}

const obtenerObligaciones_contrato = async () => {
    try {
        const [obligaciones_contrato] = await ObligacionesContrato.findAll();
        return obligaciones_contrato;
    } catch (error) {
        throw error;
    }
};

const obtenerObligaciones_contratoPorId = async (idobligaciones_contrato) => {
    try {
        const obligaciones_contratoId = await ObligacionesContrato.findById(idobligaciones_contrato);
        return obligaciones_contratoId;
    } catch (error) {
        throw error;
    }
};
async function editarObligacionesContrato(idobligaciones_contrato, nuevoObligacionesContratoData) {
    try {
        const [ObligacionesContratoExistente] = await ObligacionesContrato.findById(idobligaciones_contrato);
        if (!ObligacionesContratoExistente.length) {
            throw new Error('El ObligacionesContrato no existe');
        }

        const ObligacionesContratoActualizado = { ...ObligacionesContratoExistente[0], ...nuevoObligacionesContratoData };

        await ObligacionesContrato.update(idobligaciones_contrato, ObligacionesContratoActualizado);

        return ObligacionesContratoActualizado;
    } catch (error) {
        throw error;
    }
}

async function eliminarObligacionesContrato(idobligaciones_contrato) {
    try {
        await ObligacionesContrato.deleteById(idobligaciones_contrato);
        return { message: 'idobligaciones_contrato eliminado exitosamente' };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    crearObligacionContrato,
    obtenerObligaciones_contrato,
    editarObligacionesContrato,
    eliminarObligacionesContrato,
    obtenerObligaciones_contratoPorId
};
