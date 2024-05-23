const {
  Puestos,
  findPuesto,
  deleteByPuesto,
} = require("../models/puestosVigilanciaModel");
const pool = require("../config/database");
const { Empresa } = require("../models/empresaModel");
const { default: Decimal } = require("decimal.js");

async function crearPuesto(puestoData) {
  try {
    if (
      !puestoData ||
      !puestoData.descripcion_puesto ||
      !puestoData.tarifa_puesto
    ) {
      throw new Error("Faltan campos del Puesto");
    }

    const ays = new Decimal(puestoData.tarifa_puesto).times(0.8);
    const iva = new Decimal(puestoData.tarifa_puesto).plus(ays).times(0.019);
    const total = new Decimal(puestoData.tarifa_puesto).plus(ays).plus(iva);

    puestoData.ays = parseFloat(ays.toFixed(2));
    puestoData.iva = parseFloat(iva.toFixed(2));
    puestoData.total = parseFloat(total.toFixed(2));

    const nuevoPuesto = await Puestos.create(puestoData);
    return nuevoPuesto;
  } catch (error) {
    throw error;
  }
}

const obtenerPuestos = async () => {
  try {
    const puestos = await Puestos.findAll();
    return puestos;
  } catch (error) {
    throw error;
  }
};

// const obtenerPuestoPorId = async (req, res, next) => {
//   const id = parseInt(req.params.id);
//   if (isNaN(id)) {
//     return res.status(400).json({ message: "ID inválido" });
//   }

//   try {
//     const puesto = await PuestoVigilanciaService.obtenerPuestoPorId(id);
//     if (!puesto) {
//       return res.status(404).json({ message: "Puesto no encontrado" });
//     }
//     res
//       .status(200)
//       .json({ message: "Puesto obtenido correctamente", data: puesto });
//   } catch (error) {
//     next(error);
//   }
// };

async function editarPuesto(idpuesto_vigilancia, nuevoPuestoData) {
  try {
    const puestoExistente = await findPuesto(idpuesto_vigilancia);
    if (!puestoExistente) {
      throw new Error("Puesto no existe");
    }
    const puestoEditado = { ...puestoExistente, ...nuevoPuestoData };
    const [result] = await pool.execute(
      "UPDATE puestos_vigilancia SET descripcion_puesto=?,tarifa_puesto=?",
      [
        puestoEditado.descripcion_puesto,
        puestoEditado.tarifa_puesto,
        idpuesto_vigilancia,
      ]
    );
    if (result.affectedRows === 0) {
      throw new Error("No se pudo actualizar el puesto");
    }
    return puestoEditado;
  } catch (error) {
    throw error;
  }
}

async function eliminarPuesto(idpuesto_vigilancia) {
  try {
    await deleteByPuesto(idpuesto_vigilancia);
    return { message: "Puesto eliminado" };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  obtenerPuestos,
  crearPuesto,
  editarPuesto,
  eliminarPuesto,
};
