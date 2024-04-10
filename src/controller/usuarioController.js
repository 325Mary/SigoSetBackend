const { crearUsuario,
   obtenerUsuarios, 
   loginUser,
   editarUsuario,
   eliminarUsuario,
   cambiarContraseña,
   generarCodigoRestablecimiento,
   enviarCorreoRestablecimiento,
   restablecerContraseña,
   estadoDeUsuario,
   cerrarSesion} = require('../services/usuarioService');
const validarCamposRequeridos = require('../middleware/camposrequeridosUser');
const {findOneByEmail} = require('../models/usuarioModel')
const pool = require('../config/database');

const controller = {}

controller.crearUsuarioC = async (req, res, next) => {
  try {
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
    validarCamposRequeridos(req, res, async () => {
      const idUsuario = req.params.idUsuario;
      const nuevoUsuarioData = req.body;
      const usuarioActualizado = await editarUsuario(idUsuario, nuevoUsuarioData);
      res.status(200).json({ message: 'Usuario actualizado exitosamente', usuario: usuarioActualizado });
    });
  } catch (error) {
    res.status(404).json({ error: 'No se actualizó ningún usuario con el ID proporcionado' });
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

// Cambiar contraseña
controller.cambiarContraseñaC = async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario; 
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ error: 'El campo newPassword está vacío' });
    }

    await cambiarContraseña(idUsuario, newPassword);

    res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



controller.solicitarRestablecimiento = async (req, res) => {
  try {
    const { email_usuario } = req.body;

    const usuario = await findOneByEmail(email_usuario);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const codigoRestablecimiento = generarCodigoRestablecimiento();
    
    usuario.resetCode = codigoRestablecimiento;
// Calcular la fecha y hora de expiración
const expirationDate = new Date(Date.now() + 3600000); // 1 hora en milisegundos
// Formatear la fecha y hora de expiración en el formato esperado por MySQL
const formattedExpirationDate = expirationDate.toISOString().slice(0, 19).replace('T', ' ');

// Ejecutar una consulta SQL para actualizar los datos en la base de datos
const [result] = await pool.execute(
  'UPDATE usuario SET resetCode = ?, resetExpires = ? WHERE idUsuario = ?',
  [codigoRestablecimiento, formattedExpirationDate, usuario.idUsuario]
);

// Verificar si la actualización fue exitosa
if (result.affectedRows === 0) {
  throw new Error('No se pudo actualizar el usuario');
}

    // Enviar correo electrónico con el código de restablecimiento
    await enviarCorreoRestablecimiento(email_usuario, codigoRestablecimiento);

    res.json({ success: 'Solicitud de restablecimiento enviada con éxito' });
  } catch (error) {
    console.error('Error al solicitar restablecimiento:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


controller.restablecerContraseña = async (req, res) => {
  try {
    const { email_usuario, codigo, nuevaContraseña } = req.body;

    console.log(`Solicitud de restablecimiento de contraseña para ${email_usuario} con código ${codigo}`);

    // Llamar a la función restablecerContraseña
    const resultado = await restablecerContraseña(email_usuario, codigo, nuevaContraseña);

    // Enviar respuesta al cliente
    res.json(resultado);
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};


controller.estadoUsuarioC = async (req, res, next) => {
  try {
    const idUsuario = req.params.idUsuario; // Obtener el ID del usuario de los parámetros de la solicitud
    const nuevoUsuarioData = req.body; // Obtener los nuevos datos del usuario de la solicitud

    // Obtener el idperfil del usuario del objeto req.user (o donde lo hayas almacenado)
    const idperfil = req.user.idperfil;

    // Validar si el campo está vacío
    if (!idperfil || !nuevoUsuarioData || Object.keys(nuevoUsuarioData).length === 0) {
      return res.status(400).json({ error: 'Los datos del usuario están incompletos' });
    }

    // Llamar a la función del servicio para editar el usuario
    const usuarioActualizado = await estadoDeUsuario(idUsuario, nuevoUsuarioData, idperfil);

    res.status(200).json({ message: 'Usuario actualizado exitosamente', usuario: usuarioActualizado });
  } catch (error) {
    res.status(404).json({ error: 'No se actualizó ningún usuario con el ID proporcionado' });
  }
};


controller.cerrarSesionC = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
    }

    const token = req.headers['authorization']; // Obtener el token del encabezado de la solicitud

    // Llamar al servicio de cierre de sesión
    await cerrarSesion(token);

    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  } catch (error) {
    next(error);
  }
};



module.exports = controller;
