const { pool } = require('../config/database');

const listaNegraService = {
  async agregarToken(token) {
    try {
      const query = 'INSERT INTO blackListedTokens (token) VALUES (?)';
      const [result] = await pool.execute(query, [token.toString()]);

      console.log('Token agregado correctamente a la lista negra:', token);

      if (result.affectedRows !== 1) {
        throw new Error('Error al agregar el token a la lista negra');
      }
    } catch (error) {
      throw error;
    }
  },

  async tokenEnListaNegra(token) {
    try {
        const query = 'SELECT COUNT(*) AS count FROM blackListedTokens WHERE token = ?';
        const [result] = await pool.execute(query, [token.toString()]);

        // Verificar si el token está en la lista negra
        if (result.length === 0) {
            return false; // El token no está en la lista negra
        }

        return result[0].count > 0;
    } catch (error) {
        throw error;
    }
}

};

module.exports = { listaNegraService };
