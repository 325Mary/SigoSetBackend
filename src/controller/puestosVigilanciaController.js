const { ResponseStructure } = require("../helpers/ResponseStructure");
const {
  crearPuesto,
  editarPuesto,
  eliminarPuesto,
  obtenerPuestos,
} = require("../services/puestosVigilanciaService");




const validarCamposRequeridos = require("../middleware/camposrequeridosUser.js");
const controller = {};

controller.crearPuestoC = async (req, res, next) => {
  try {
    validarCamposRequeridos(["descripcion_puesto,tarifa_puesto"])(req,res,async () => {
        const puestoData = req.body;
        const puesto = await crearPuesto(puestoData);
        res.status(201).json({
          ...ResponseStructure,
          message: "Puesto Creado",
          data: puesto,
        });
      }
    );
  } catch (error) {
    next(error);
  }
};
controller.listarPuestosC = async (req, res, next) => {
  try {
    const listPuesto = await obtenerPuestos();
    res.status(200).json({ ...ResponseStructure, data: listPuesto });
  } catch (error) {
    res.status(404).json({
      ...ResponseStructure,
      status: 404,
      error: "No se obtubieron los puestos",
    });
  }
};

controller.editarPuestoC = async (req, res, next) => {
  try {
    const idpuesto_vigilancia = req.params.idpuesto_vigilancia;
    const nuevoPuesto = req.body;
    if (Object.keys(nuevoPuesto).length === 0) {
      return res.status(400).json({
        ...ResponseStructure,
        status: 400,
        error: "El cuerpo de la solicitud está vacío",
      });
    }
    const camposValidos = ["descripcion_puesto", "tarifa_puesto"];
    const camposRecibidos = Object.keys(nuevoPuesto);
    const camposInvalidos = camposRecibidos.filter(
      (field) => !camposValidos.includes(field)
    );
    if (camposInvalidos.length > 0) {
      return res.status(400).json({
        ...ResponseStructure,
        status: 400,
        error: "El cuerpo de la solicitud contiene campos no válidos",
        invalidFields: camposInvalidos,
      });
    }
    const puestoEditado = await editarPuesto(idpuesto_vigilancia, nuevoPuesto);
    res
      .status(200)
      .json({
        ...ResponseStructure,
        message: "Puesto actualizado",
        data: puestoEditado,
      });
  } catch (error) {
    res
      .status(404)
      .json({
        ...ResponseStructure,
        status: 404,
        error: "No se Actualizo ningun puesto",
      });
  }
};

controller.eliminarPuestoC = async (req, res, next) => {
  try {
    const idpuesto_vigilancia = req.params.idpuesto_vigilancia;
    await eliminarPuesto(idpuesto_vigilancia);
    res
      .status(200)
      .json({ ...ResponseStructure, message: "Puesto eliminado exitosamente" });
  } catch (error) {
    res
      .status(404)
      .json({
        ...ResponseStructure,
        status: 404,
        error: `No se encontró ningun Puesto con el ID ${req.params.idpuesto_vigilancia} proporcionado`,
      });
  }
};
module.exports = controller;
