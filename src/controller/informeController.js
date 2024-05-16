const { ResponseStructure } = require('../helpers/ResponseStructure');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');
const { crearInforme,
    obtenerInformes,
    editarInforme,
    eliminarInforme } = require('../services/informeService');
const controller = {}

controller.crearInformeC = async (req, res, next) => {
  try {
    validarCamposRequeridos(['id_zona, id_departamento, id_municipio, id_centro_formacion, servicio, puestos_seleccionados, fecha_creacion, validaciones'])(req, res, async () => {
      const informesData = req.body;

      
      const informe = await crearInforme(informesData);
      res.status(201).json({ ...ResponseStructure, message: 'informe creado exitosamente', data: informe });
    });
  } catch (error) {
    next(error);
  }
};

controller.obtenerInformesC = async (req, res, next) => {
  try {
    const listInformes = await obtenerInformes();
    res.status(200).json({ ...ResponseStructure, data: listInformes });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se obtuvieron los informes' });
  }
};

controller.editarInformeC = async (req, res, next) => {
  try {
    const idInformes = req.params.idInformes;
    const nuevoInformeData = req.body;

    // Verificar si el cuerpo de la solicitud está vacío
    if (Object.keys(nuevoInformeData).length === 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud está vacío' });
    }

    // Definir los campos válidos esperados
    const camposValidos = ['id_zona, id_departamento, id_municipio, id_centro_formacion, servicio, puestos_seleccionados, fecha_creacion, validaciones'];

    // Verificar si todos los campos recibidos están en la lista de campos válidos
    const camposRecibidos = Object.keys(nuevoInformeData);
    const camposInvalidos = camposRecibidos.filter(field => !camposValidos.includes(field));

    if (camposInvalidos.length > 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud contiene campos no válidos', invalidFields: camposInvalidos });
    }

    const informeActualizado = await editarInforme(idInformes, nuevoInformeData);
    res.status(200).json({ ...ResponseStructure, message: 'Informe actualizado exitosamente', data: informeActualizado });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se actualizó ningún informe con el ID proporcionado' });
  }
};

controller.eliminarInformeC = async (req, res, next) => {
  try {
    const idInformes = req.params.idInformes;
    await eliminarInforme(idInformes);
    res.status(200).json({ ...ResponseStructure, message: 'Informe eliminado exitosamente' });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ningún informe con el ID ${req.params.idInformes} proporcionado` });
  }
};

module.exports = controller;
