const { ResponseStructure } = require('../helpers/ResponseStructure');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');
const { crearMunicipio, obtenerMunicipios, editarMunicipio, eliminarMunicipio } = require('../services/municipioService');

const controller = {}

controller.crearMunicipioC = async (req, res, next) => {
  try {
    validarCamposRequeridos(['iddepartamento', 'municipio'])(req, res, async () => {
      const municipioData = req.body;
      const municipio = await crearMunicipio(municipioData);
      res.status(201).json({ ...ResponseStructure, message: 'Municipio creado exitosamente', data: municipio });
    });
  } catch (error) {
    next(error);
  }
};

controller.obtenerMunicipiosC = async (req, res, next) => {
  try {
    const listMunicipios = await obtenerMunicipios();
    res.status(200).json({ ...ResponseStructure, data: listMunicipios });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se obtuvieron los municipios' });
  }
};

controller.editarMunicipioC = async (req, res, next) => {
  try {
    const idMunicipio = req.params.idmunicipio;
    const nuevoMunicipioData = req.body;

    // Verificar si el cuerpo de la solicitud está vacío
    if (Object.keys(nuevoMunicipioData).length === 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud está vacío' });
    }

    // Definir los campos válidos esperados
    const camposValidos = ['iddepartamento', 'municipio'];

    // Verificar si todos los campos recibidos están en la lista de campos válidos
    const camposRecibidos = Object.keys(nuevoMunicipioData);
    const camposInvalidos = camposRecibidos.filter(field => !camposValidos.includes(field));

    if (camposInvalidos.length > 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud contiene campos no válidos', invalidFields: camposInvalidos });
    }

    const municipioActualizado = await editarMunicipio(idMunicipio, nuevoMunicipioData);
    res.status(200).json({ ...ResponseStructure, message: 'Municipio actualizado exitosamente', data: municipioActualizado });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se actualizó ningún municipio con el ID proporcionado' });
  }
};

controller.eliminarMunicipioC = async (req, res, next) => {
  try {
    const idMunicipio = req.params.idmunicipio;
    await eliminarMunicipio(idMunicipio);
    res.status(200).json({ ...ResponseStructure, message: 'Municipio eliminado exitosamente' });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ningún municipio con el ID ${req.params.idmunicipio} proporcionado` });
  }
};

module.exports = controller;
