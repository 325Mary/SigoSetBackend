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
      !contratoEmpresavData.fecha_fin ||
      !contratoEmpresavData.contrato_pdf
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

const obtenerContratoEmpresas = async (idperfil, email_usuario) => {
  try {
    let contratos;
    if (idperfil === 1) {
      contratos = await contratoEmpresa.findAll();
    } else {
      contratos = await contratoEmpresa.findAllEmail(email_usuario);
      console.log("hola");
    }
    
    return contratos || [];
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
      "UPDATE contrato_empresa SET  idempresa = ?, descripcion_contrato = ? , fecha_inicio = ? , fecha_fin= ?, contrato_pdf = ? WHERE idContrato_empresa = ?",
      [
        ContratoEmpresaActualizado.idempresa,
        ContratoEmpresaActualizado.descripcion_contrato,
        ContratoEmpresaActualizado.fecha_inicio,
        ContratoEmpresaActualizado.fecha_fin,
        ContratoEmpresaActualizado.contrato_pdf,
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


async function verificarVigenciaContratos() {
  const sql = `UPDATE contrato_empresa 
               SET estado = CASE 
                             WHEN fecha_fin < CURDATE() THEN 0 
                             ELSE 1 
                           END`;
  try {
    const [result] = await pool.execute(sql);
    // console.log(`Se actualizaron ${result.affectedRows} contratos.`);
  } catch (error) {
    console.error('Error al verificar la vigencia de los contratos:', error);
  }
}

module.exports = {
  crearContratoEmpresa,
  obtenerContratoEmpresas,
  editarContratoEmpresa,
  eliminarContratoEmpresa,
  verificarVigenciaContratos,
};
