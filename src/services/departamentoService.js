const Departamento = require("../models/departamentosModel");

const crearDepartamento = async () => {
  try {
    const result = await Departamento.create(regionalData);
    return result;
  } catch (error) {
    throw error;
  }
};

const obtenerDepartamentoPorId = async (req, res, next) => {
  const iddepartamento = parseInt(req.params.iddepartamento);
  try {
    const departamento = await Departamento.findById(iddepartamento);
    return departamento;
  } catch (error) {
    throw error;
  }
};

const obtenerDepartamentos = async () => {
  try {
    const departamentos = await Departamento.findAll();
    return departamentos;
  } catch (error) {
    throw error;
  }
};

async function editarDepartamento(iddepartamento, nuevoDepartamentoData) {
  try {
    const result = await Departamento.update(iddepartamento, regionalData);
    return result;
} catch (error) {
    throw error;
}
}

async function eliminarDepartamento(iddepartamento) {
  try {
    const result = await Departamento.deleteById(iddepartamento);
    return result;
} catch (error) {
    throw error;
}
}

module.exports = {
  crearDepartamento,
  obtenerDepartamentos,
  editarDepartamento,
  eliminarDepartamento,
  obtenerDepartamentoPorId,
};
