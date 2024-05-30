const { ResponseStructure } = require('../helpers/ResponseStructure');
const { obtenerObligacionesPorEmpresa } = require('../services/informeService');

const controller = {};

controller.obtenerObligaciones = async (req, res) => {
  const { idEmpresa } = req.params;
  try {
    const obligaciones = await obtenerObligacionesPorEmpresa(idEmpresa);
    res.status(200).json(obligaciones);
  } catch (error) {
    console.error('Error en el controlador de obligaciones:', error.message);
    res.status(404).json({ error: 'No se obtuvo el listado de obligaciones' });
  }
};

module.exports = controller;
