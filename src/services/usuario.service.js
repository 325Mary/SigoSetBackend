const {Usuario,
   findOneByEmail,
   findByPk} = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

require('dotenv').config();


async function crearUsuario(usuarioData) {
  try {
      if (!usuarioData || !usuarioData.idperfil || !usuarioData.idcentro_formacion || !usuarioData.identificacion || !usuarioData.nombre_usuario || !usuarioData.apellido_usuario || !usuarioData.telefono_usuario || !usuarioData.email_usuario || !usuarioData.password || !usuarioData.estado) {
          throw new Error('Faltan datos del usuario');
      }

      // Aplicar hash a la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(usuarioData.password, 10);

      // Reemplazar la contraseña sin encriptar con la contraseña encriptada
      usuarioData.password = hashedPassword;

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


async function loginUser(req, res) {
  try {
    const { email_usuario, password } = req.body;

    if (!email_usuario || !password) {
      return res.status(400).json({ error: 'El correo electrónico y la contraseña son requeridos' });
    }

    // Obtener el usuario desde la base de datos
    const user = await findOneByEmail(email_usuario);

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Comparar contraseñas encriptadas
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Si coinciden, enviar token de autenticación
      res.json({ success: 'Inicio de sesión correcto', token: crearToken(user), userId: user.idUsuario });
    } else {
      // Si no coinciden, enviar error de credenciales inválidas
      return res.status(401).json({ error: 'Credenciales inválidas {' });
    }

  } catch (e) {
    console.error('Error:', e);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Crear token
function crearToken(user) {
  const { idUsuario, email_usuario,  nombre_usuario, identificacion } = user;
  const payload = { userId: idUsuario, email_usuario , nombre_usuario, identificacion};
  console.log("Atributos del payload:", payload); // Imprimir el payload
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: '1h' };
  const token = jwt.sign(payload, secret, options);
  return token;
}


async function editarUsuario(idUsuario, nuevoUsuarioData) {
  try {
    // Verificar si el usuario existe
    const usuarioExistente = await findByPk(idUsuario);
    if (!usuarioExistente) {
      throw new Error('El usuario no existe');
    }

    // Actualizar los campos del usuario existente con los nuevos datos
    const usuarioActualizado = { ...usuarioExistente, ...nuevoUsuarioData };

    // Realizar la actualización en la base de datos
    const [result] = await pool.execute(
      'UPDATE usuario SET idperfil = ?, idcentro_formacion = ?, identificacion = ?, nombre_usuario = ?, apellido_usuario = ?, telefono_usuario = ?, email_usuario = ?, password = ?, estado = ? WHERE idUsuario = ?',
      [
        usuarioActualizado.idperfil,
        usuarioActualizado.idcentro_formacion,
        usuarioActualizado.identificacion,
        usuarioActualizado.nombre_usuario,
        usuarioActualizado.apellido_usuario,
        usuarioActualizado.telefono_usuario,
        usuarioActualizado.email_usuario,
        usuarioActualizado.password,
        usuarioActualizado.estado,
        idUsuario
      ]
    );

    // Verificar si la actualización fue exitosa
    if (result.affectedRows === 0) {
      throw new Error('No se pudo actualizar el usuario');
    }

    return usuarioActualizado;
  } catch (error) {
    throw error;
  }
}


module.exports = {
    crearUsuario,
    obtenerUsuarios,
    loginUser,
    editarUsuario
};
