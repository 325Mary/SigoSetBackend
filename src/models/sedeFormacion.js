const pool = require('../config/database');

// Función para desasignar una sede del centro de formación
async function desasignarSede(idSedeFormacion) {
  try {
    // Realiza la actualización
    const updateQuery = `
      UPDATE sede_formacion
      SET idcentro_formacion = NULL
      WHERE idsede_formacion = ?;
    `;

    await pool.query(updateQuery, [idSedeFormacion]);

    // Realiza una consulta separada para obtener la sede actualizada
    const selectQuery = `
      SELECT * FROM sede_formacion
      WHERE idsede_formacion = ?;
    `;

    const [rows] = await pool.query(selectQuery, [idSedeFormacion]);

    if (rows.length > 0) {
      return rows[0];
    } else {
      throw new Error('No se encontró la sede para desasignar.');
    }
  } catch (error) {
    throw new Error(`Error al desasignar la sede: ${error.message}`);
  }
}

module.exports = {
  desasignarSede
};
