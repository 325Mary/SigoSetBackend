const Usuario = require('../models/usuario.model');

async function crearUsuario(usuarioData) {
    try {
        // Utiliza el método apropiado del modelo de usuario para crear un nuevo usuario
        // Por ejemplo, si el método se llama `create`, utiliza `Usuario.create(usuarioData)`
        const nuevoUsuario = await Usuario.create(usuarioData);
        return nuevoUsuario;
    } catch (error) {
        throw error;
    }
}

const obtenerUsuarios = async () => {
  try {
    const usuarios = await Usuario.findAll();
    return usuarios;
  } catch (error) {
    throw error;
  }
};

module.exports = {
    crearUsuario,
    obtenerUsuarios
};
