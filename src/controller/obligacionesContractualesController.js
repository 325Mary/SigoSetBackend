
const servicioObligacionesContractuales = require('../services/obligacionContractualService');

const obtenerObligacionesContractuales = (req, res) => {
    servicioObligacionesContractuales.obtenerObligacionesContractuales((error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json(results);
    });
};

const obtenerObligacionContractualPorId = (req, res) => {
    const id = req.params.id;
    servicioObligacionesContractuales.obtenerObligacionContractualPorId(id, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (results.length === 0) {
            return res.status(404).send('Obligación contractual no encontrada');
        }
        res.status(200).json(results[0]);
    });
};

const crearObligacionContractual = (req, res) => {
    const nuevaObligacion = req.body;
    servicioObligacionesContractuales.crearObligacionContractual(nuevaObligacion, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(201).send(`Obligación contractual creada con ID: ${results.insertId}`);
    });
};

const actualizarObligacionContractualPorId = (req, res) => {
    const id = req.params.id;
    const datosActualizados = req.body;
    servicioObligacionesContractuales.actualizarObligacionContractualPorId(id, datosActualizados, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).send(`Obligación contractual actualizada con ID: ${id}`);
    });
};

const eliminarObligacionContractualPorId = (req, res) => {
    const id = req.params.id;
    servicioObligacionesContractuales.eliminarObligacionContractualPorId(id, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).send(`Obligación contractual eliminada con ID: ${id}`);
    });
};

module.exports = {
    obtenerObligacionesContractuales,
    obtenerObligacionContractualPorId,
    crearObligacionContractual,
    actualizarObligacionContractualPorId,
    eliminarObligacionContractualPorId
};