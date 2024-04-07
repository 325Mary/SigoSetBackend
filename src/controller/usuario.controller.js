const { crearUsuario,
   obtenerUsuarios, 
   loginUser,
   editarUsuario } = require('../services/usuario.service');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');

const controller = {}

controller.crearUsuarioC = async (req, res, next) => {
  try {
    // Llama al middleware para validar los campos requeridos
    validarCamposRequeridos(req, res, async () => {
      const usuarioData = req.body;
      const usuario = await crearUsuario(usuarioData);
      res.status(201).json({ message: 'Usuario creado exitosamente', usuario });
    });
  } catch (error) {
    next(error);
  }
};

controller.obtenerUsuariosC = async (req, res, next) => {
  try {
    const usuarios = await obtenerUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
};

controller.postLogin = async (req, res) => {
  await loginUser(req, res);
};


controller.editarUsuarioC = async (req, res, next) => {
  try {
    const idUsuario = req.params.idUsuario; // Obtener el ID del usuario de los parámetros de la solicitud
    const nuevoUsuarioData = req.body; // Obtener los nuevos datos del usuario de la solicitud

    // Llamar a la función del servicio para editar el usuario
    const usuarioActualizado = await editarUsuario(idUsuario, nuevoUsuarioData);

    res.status(200).json({ message: 'Usuario actualizado exitosamente', usuario: usuarioActualizado });
  } catch (error) {
    next(error);
  }
};
module.exports = controller;
