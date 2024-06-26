const {
  contratoEmpresa,
  findByContratoEmpres,
  deleteByIdContratoEmpres,
} = require("../models/contratoEmpresaModel");
const pool = require("../config/database");

async function crearContratoEmpresa(contratoEmpresavData) {
  try {
    if (
      !contratoEmpresavData ||
      !contratoEmpresavData.idempresa ||
      !contratoEmpresavData.descripcion_contrato ||
      !contratoEmpresavData.fecha_inicio ||
      !contratoEmpresavData.fecha_fin
    ) {
      throw new Error("Faltan datos del contrato de empresa");
    }

    const nuevoContratoEmpresa = await contratoEmpresa.create(
      contratoEmpresavData
    );
    return nuevoContratoEmpresa;
  } catch (error) {
    throw error;
  }
}

const obtenerContratoEmpresas = async () => {
  try {
    const contratoEmpresas = await contratoEmpresa.findAll();
    return contratoEmpresas;
  } catch (error) {
    throw error;
  }
};

async function editarContratoEmpresa(
  idContrato_empresa,
  nuevoContratoEmpresaData
) {
  try {
    const contratoEmpresaExistente = await findByContratoEmpres(
      idContrato_empresa
    );
    if (!contratoEmpresaExistente) {
      throw new Error("El contratro de empresa no existe");
    }

    const ContratoEmpresaActualizado = {
      ...contratoEmpresaExistente,
      ...nuevoContratoEmpresaData,
    };

    // Realizar la actualización en la base de datos
    const [result] = await pool.execute(
      "UPDATE contrato_empresa SET  idempresa = ?, descripcion_contrato = ? , fecha_inicio = ? , fecha_fin= ? WHERE idContrato_empresa = ?",
      [
        ContratoEmpresaActualizado.idempresa,
        ContratoEmpresaActualizado.descripcion_contrato,
        ContratoEmpresaActualizado.fecha_inicio,
        ContratoEmpresaActualizado.fecha_fin,
        idContrato_empresa,
      ]
    );

    // Verificar si la actualización fue exitosa
    if (result.affectedRows === 0) {
      throw new Error("No se pudo actualizar el contrato de empresa");
    }

    return ContratoEmpresaActualizado;
  } catch (error) {
    throw error;
  }
}

async function eliminarContratoEmpresa(idContrato_empresa) {
  try {
    await deleteByIdContratoEmpres(idContrato_empresa);
    return { message: "contrato de empresa eliminado exitosamente" };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  crearContratoEmpresa,
  obtenerContratoEmpresas,
  editarContratoEmpresa,
  eliminarContratoEmpresa,
};
