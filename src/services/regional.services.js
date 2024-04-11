// const Regional = require('../models/regional.model');

// const getAllRegionals = async() => {
//     try {
//         const regionals = await Regional.findAll();
//         return regionals;
//     } catch (error) {
//         throw error;
//     }
// };

// const createRegional = async(regionalData) => {
//     try {
//         const result = await Regional.create(regionalData);
//         return result;
//     } catch (error) {
//         throw error;
//     }
// };

// const getRegionalById = async(id) => {
//     try {
//         const regional = await Regional.findByPk(id);
//         return regional;
//     } catch (error) {
//         throw error;
//     }
// };

// const updateRegional = async(id, regionalData) => {
//     try {
//         const result = await Regional.update(id, regionalData);
//         return result;
//     } catch (error) {
//         throw error;
//     }
// };

// const deleteRegionalById = async(id) => {
//     try {
//         const result = await Regional.deleteById(id);
//         return result;
//     } catch (error) {
//         throw error;
//     }
// };

// module.exports = {
//     getAllRegionals,
//     createRegional,
//     getRegionalById,
//     updateRegional,
//     deleteRegionalById
// };

const Regional = require('../models/regional.model');

const getAllRegionals = async() => {
    try {
        const regionals = await Regional.findAll();
        return regionals;
    } catch (error) {
        throw error;
    }
};

const createRegional = async(regionalData) => {
    try {
        const result = await Regional.createRegional(regionalData);
        return result;
    } catch (error) {
        throw error;
    }
};

const getRegionalById = async(id) => {
    try {
        const regional = await Regional.findById(id);
        return regional;
    } catch (error) {
        throw error;
    }
};

const updateRegional = async(id, regionalData) => {
    try {
        const result = await Regional.update(id, regionalData);
        return result;
    } catch (error) {
        throw error;
    }
};

const deleteRegionalById = async(id) => {
    try {
        const result = await Regional.deleteById(id);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllRegionals,
    createRegional,
    getRegionalById,
    updateRegional,
    deleteRegionalById
};