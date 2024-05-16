const { ResponseStructure } = require('../helpers/ResponseStructure');
const  {obtenerPuestosVigilancia, 
  obtenerPuestosXcentro, 
  obtenerPuestosEXcentro ,
  crearPuestosVxCentro,
  crearPuestosVExCentro,
  editarPuestoVXcentro,
  editarPuestoVEXcentro, 
  eliminarPuestoVXcentro,
  eliminarPuestoVEXcentro}  = require('../services/puestosXcentroV&EService')
const controller = {}
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');


controller.obtenerPuestVC = async (req, res, next) => {
  try {
    const listPuest = await obtenerPuestosVigilancia();
    res.status(200).json({ ...ResponseStructure, data: listPuest });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se obtuvieron los puestos' });
  }
};

controller.obtenerPuestosXcentroC = async(req, res, next) => {  
  try {
    const { idcentro_formacion } = req.params;
    const ListXcentro = await obtenerPuestosXcentro(idcentro_formacion);
    res.status(200).json({ ...ResponseStructure, data: ListXcentro });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se obtuvieron los puestos por centro' });
  }
}

controller.obtenerPuestosEXcentroC = async(req, res, next) => {
  try {
    const { idcentro_formacion } = req.params;
    const ListEXcentro = await obtenerPuestosEXcentro(idcentro_formacion);
    res.status(200).json({ ...ResponseStructure, data: ListEXcentro });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se obtuvieron los puestos por centro' });
  }
}


controller.crearPuestoVXcentroC = async (req, res, next) => {
  try {
    validarCamposRequeridos(['idcentro_formacion', 'idempresa', 'idpuesto_vigilancia', 'cantidad_puestov'])(req, res, async () => {
      const puestosvigilanciaXcentroData = req.body;

      
      const puestoVXcentro = await crearPuestosVxCentro(puestosvigilanciaXcentroData);
      res.status(201).json({ ...ResponseStructure, message: 'puesto  por centro creado exitosamente', data: puestoVXcentro });
    });
  } catch (error) {
    next(error);
  }
};

controller.crearPuestoVEXcentroC = async (req, res, next) => {
  try {
    validarCamposRequeridos(['idcentro_formacion', 'idempresa', 'idvigilancia_electronica', 'cantidad_puestov'])(req, res, async () => {
      const puntosvelectronicaData = req.body;

      
      const puestoVEXcentro = await crearPuestosVExCentro(puntosvelectronicaData);
      res.status(201).json({ ...ResponseStructure, message: 'puesto E por centro creado exitosamente', data: puestoVEXcentro });
    });
  } catch (error) {
    next(error);
  }
};


controller.editarPuestoVxCentroC = async (req, res, next) => {
  try {
    const idpuestosvxcentrof = req.params.idpuestosvxcentrof;
    const nuevoPuestoXcentroData = req.body;

    // Verificar si el cuerpo de la solicitud está vacío
    if (Object.keys(nuevoPuestoXcentroData).length === 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud está vacío' });
    }

    // Definir los campos válidos esperados
    const camposValidos = ['idcentro_formacion', 'idempresa', 'idpuesto_vigilancia', 'cantidad_puestov'];

    // Verificar si todos los campos recibidos están en la lista de campos válidos
    const camposRecibidos = Object.keys(nuevoPuestoXcentroData);
    const camposInvalidos = camposRecibidos.filter(field => !camposValidos.includes(field));

    if (camposInvalidos.length > 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud contiene campos no válidos', invalidFields: camposInvalidos });
    }

    const puestoVxCebtroActualizado = await editarPuestoVXcentro(idpuestosvxcentrof, nuevoPuestoXcentroData);
    res.status(200).json({ ...ResponseStructure, message: ' actualizado exitosamente', data: puestoVxCebtroActualizado });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se actualizó ningúno con el ID proporcionado' });
  }
};

controller.editarPuestoVExCentroC = async (req, res, next) => {
  try {
    const idpuntosvelectronica = req.params.idpuntosvelectronica;
    const nuevoPuestoVEXcentroData = req.body;

    // Verificar si el cuerpo de la solicitud está vacío
    if (Object.keys(nuevoPuestoVEXcentroData).length === 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud está vacío' });
    }

    // Definir los campos válidos esperados
    const camposValidos = ['idcentro_formacion', 'idempresa', 'idvigilancia_electronica', 'cantidad_puestov'];

    // Verificar si todos los campos recibidos están en la lista de campos válidos
    const camposRecibidos = Object.keys(nuevoPuestoVEXcentroData);
    const camposInvalidos = camposRecibidos.filter(field => !camposValidos.includes(field));

    if (camposInvalidos.length > 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, error: 'El cuerpo de la solicitud contiene campos no válidos', invalidFields: camposInvalidos });
    }

    const puestoVExCebtroActualizado = await editarPuestoVEXcentro(idpuntosvelectronica, nuevoPuestoVEXcentroData);
    res.status(200).json({ ...ResponseStructure, message: ' actualizado exitosamente', data: puestoVExCebtroActualizado });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se actualizó ningúno con el ID proporcionado' });
  }
};


controller.eliminarPuestoVXcentroC = async (req, res, next) => {
  try {
    const idpuestosvxcentrof = req.params.idpuestosvxcentrof;
    await eliminarPuestoVXcentro(idpuestosvxcentrof);
    res.status(200).json({ ...ResponseStructure, message: ' eliminado exitosamente' });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ningúno con el ID ${req.params.idpuestosvxcentrof} proporcionado` });
  }
};

controller.eliminarPuestoVEXcentroC = async (req, res, next) => {
  try {
    const idpuntosvelectronica = req.params.idpuntosvelectronica;
    await eliminarPuestoVEXcentro(idpuntosvelectronica);
    res.status(200).json({ ...ResponseStructure, message: ' eliminado exitosamente' });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: `No se encontró ningúno con el ID ${req.params.idpuntosvelectronica} proporcionado` });
  }
};

module.exports= controller