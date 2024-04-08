const { crearUsuario,
   obtenerUsuarios, 
   loginUser,
   editarUsuario,
   eliminarUsuario } = require('../services/usuario.service');
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
    res.status(404).json({ error: 'No se  obtuvieron los usuarios' });;
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
    res.status(404).json({ error: 'No se Actualizo ningún usuario con el ID proporcionado' });;
  }
};

controller.eliminarUsuarioC = async (req, res, next) => {
  try {
    const idUsuario = req.params.idUsuario; // Obtener el ID del usuario de los parámetros de la solicitud
    await eliminarUsuario(idUsuario);
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(404).json({ error: 'No se encontró ningún usuario con el ID proporcionado' }); // Mensaje de error personalizado
  }
};

module.exports = controller;
