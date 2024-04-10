const  {
    crearMunicipio,
    obtenerMunicipios,
    editarMunicipio,
    eliminarMunicipio
 }= require('../services/municipioService')
 const validarCamposRequeridos = require('../middleware/camposrequeridosUser');


 const controller = {}


controller.crearMunicipioC = async (req, res, next) => {
    try {
      validarCamposRequeridos(['iddepartamento', 'municipio'])(req, res, async () => {
        const municipioData = req.body;
        const municipio = await     crearMunicipio(municipioData);
        (municipioData);
        res.status(201).json({ message: 'municipio creado exitosamente', municipio });
      });
    } catch (error) {
      next(error);
    }
  };
  
  controller.obtenerMunicipiosC = async (req, res, next) => {
    try {
      const listMunicipios = await obtenerMunicipios();
      res.status(200).json(listMunicipios);
    } catch (error) {
      res.status(404).json({ error: 'No se  obtuvieron los municipios' });;
    }
  };
  

  
  controller.editarMunicipioC = async (req, res, next) => {
    try {
      const municipio = req.params.idmunicipio;
      const nuevoMunicipioData = req.body;
      const usuarioActualizado = await editarMunicipio(municipio, nuevoMunicipioData);
      res.status(200).json({ message: 'municipio actualizado exitosamente', municipio: nuevoMunicipioData });
    } catch (error) {
      res.status(404).json({ error: 'No se actualizó ningún municipio con el ID proporcionado'});
    }
  };
  
  controller.eliminarMunicipioC = async (req, res, next) => {
    try {
      const idmunicipio = req.params.idmunicipio;
      await eliminarMunicipio(idmunicipio);
      res.status(200).json({ message: 'municipio eliminado exitosamente' });
    } catch (error) {
      res.status(404).json({ error: `No se encontró ningún municipio con el ID ${req.params.idmunicipio} proporcionado` });
    }
  };
  
  
  
  module.exports = controller;
  