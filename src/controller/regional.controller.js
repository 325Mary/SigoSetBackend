
const {
    getAllRegionals,
    createRegional,
    getRegionalById,
    updateRegional,
    deleteRegionalById
} = require('../services/regional.services');

const RegionalController = {};

RegionalController.getAllRegionals = async(req, res) => {
    try {
        const regionals = await getAllRegionals();
        res.json(regionals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las regionales' });
    }
};

RegionalController.getRegionalById = async(req, res) => {
    const id = req.params.id;
    try {
        const regional = await getRegionalById(id);
        if (regional) {
            res.json(regional);
        } else {
            res.status(404).json({ message: 'Regional no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la regional' });
    }
};

RegionalController.createRegional = async(req, res) => {
    const regionalData = req.body;
    try {
        const newRegional = await createRegional(regionalData);
        res.status(201).json(newRegional);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la regional' });
    }
};

RegionalController.updateRegional = async(req, res) => {
    const id = req.params.id;
    const regionalData = req.body;
    try {
        const updatedRegional = await updateRegional(id, regionalData);
        res.json(updatedRegional);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la regional' });
    }
};

RegionalController.deleteRegionalById = async(req, res) => {
    const id = req.params.id;
    try {
        await deleteRegionalById(id);
        res.json({ message: 'Regional eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la regional' });
    }
};

module.exports = RegionalController;