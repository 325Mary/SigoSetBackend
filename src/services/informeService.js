const { ObliXcentro } = require('../models/informesModel');

const obtenerObligacionesPorEmpresa = async (idempresa) => {
  try {
    const [obligacionesXempresa] = await ObliXcentro.findAll(idempresa);
    return obligacionesXempresa;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  obtenerObligacionesPorEmpresa
};
