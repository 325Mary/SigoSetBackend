const {crearUsuario, obtenerUsuarios} = require('../services/usuario.service');


const controller = {}
controller.crearUsuarioC = async (req, res, next) => {
    try {
        const usuario = await crearUsuario(req.body);
        res.status(201).json({ message: 'Usuario creado exitosamente', usuario });
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

module.exports = controller
