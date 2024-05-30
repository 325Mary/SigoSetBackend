const pool = require("../config/database");
const Puestos = {
  findAll: function () {
    return pool.execute("SELECT * FROM puestos_vigilancia");
  },
  create: async function (Puestosdata) {
    const sql = `INSERT INTO puestos_vigilancia(
            descripcion_puesto,
            tarifa_puesto,
            ays,
            iva,
            total) VALUES (?,?,?,?,?)`;

    try {
      const [result] = await pool.execute(sql, [
        Puestosdata.descripcion_puesto,
        Puestosdata.tarifa_puesto,
        Puestosdata.ays,
        Puestosdata.iva,
        Puestosdata.total,
      ]);
      if (result.affectedRows === 1) {
        const nuevoPuesto = {
            id: result.insertId,
            descripcion_puesto: Puestosdata.descripcion_puesto,
            tarifa_puesto: Puestosdata.tarifa_puesto,
            ays: Puestosdata.ays,
            iva: Puestosdata.iva,
            total: Puestosdata.total
        };
        return nuevoPuesto;
      }else{
        throw new Error ('No se pudo crear el Puesto')
      }
    } catch (error) {throw error}
  },
};
async function findPuesto(idpuesto_vigilancia) {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM puestos_vigilancia WHERE idpuesto_vigilancia = ?",[idpuesto_vigilancia]);
    return rows[0]
  }

async function findOnePuesto(descripcion_puesto) {
    const [rows, fields] = await pool.execute(
      "SELECT * FROM puestos_vigilancia WHERE descripcion_puesto = ?",
      [descripcion_puesto]);
      return rows[0]
  }


async function deleteByPuesto(idpuesto_vigilancia) {
  try {
    const [result] = await pool.execute(
      "DELETE FROM puestos_vigilancia WHERE idpuesto_vigilancia = ? ",
      [idpuesto_vigilancia]
    );
    if (result.affectedRows === 0) {
      throw new Error("Puesto no existe");
    }
    return { message: "Puesto eliminado" };
  } catch (error) {
    throw error;
  }
}

module.exports = { Puestos, findPuesto, deleteByPuesto,findOnePuesto };
