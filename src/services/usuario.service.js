const {Usuario,
   findOneByEmail,
   findByPk,
   deleteById} = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const nodemailer = require('nodemailer');
const {listaNegraService} = require('../services/listaNegra.service')


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
  const { idUsuario, email_usuario,  nombre_usuario, identificacion, idperfil } = user;
  const payload = { userId: idUsuario, email_usuario , nombre_usuario, identificacion, idperfil};
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

async function eliminarUsuario(idUsuario) {
  try {
    await deleteById(idUsuario);
    return { message: 'Usuario eliminado exitosamente' };
  } catch (error) {
    throw error;
  }
}

// Cambiar contraseña del usuario
const cambiarContraseña = async (idUsuario, newPassword) => {
  try {
    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Ejecutar una consulta SQL para actualizar la contraseña en la base de datos
    const [result] = await pool.execute(
      'UPDATE usuario SET password = ? WHERE idUsuario = ?',
      [hashedPassword, idUsuario]
    );

    // Verificar si la actualización fue exitosa
    if (result.affectedRows === 0) {
      throw new Error('No se pudo cambiar la contraseña');
    }

    return { message: 'Contraseña cambiada exitosamente' };
  } catch (error) {
    throw error;
  }
};

// Generar un código de restablecimiento único y seguro
const generarCodigoRestablecimiento = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase(); 
};

// Enviar correo electrónico con el código de restablecimiento
const enviarCorreoRestablecimiento = async (email_usuario, codigo) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    service: 'gmail',
    auth: {
      user: 'sigoset66@gmail.com',
      pass: 'w f v s q s c d m l g l m n t a'
    }
  });

  const mailOptions = {
    from: 'sigoset66@gmail.com',
    to: email_usuario,
    subject: 'Código de Restablecimiento de Contraseña',
    html: `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 5px;
            padding: 30px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
          }
          p {
            color: #666;
          }
          .code {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Código de Restablecimiento de Contraseña</h1>
          <p>Estimado usuario,</p>
          <p>Tu código de restablecimiento es:</p>
          <p class="code">${codigo}</p>
          <p>Por favor, utiliza este código para restablecer tu contraseña.</p>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo de restablecimiento enviado a', email_usuario);
  } catch (error) {
    console.error('Error al enviar el correo de restablecimiento:', error);
    throw error;
  }
};



const restablecerContraseña = async (email_usuario, codigo, nuevaContraseña) => {
  try {
    console.log(`Intento de restablecimiento de contraseña para ${email_usuario} con código ${codigo}`);

    // Buscar el usuario por correo electrónico y código de restablecimiento
    const usuario = await findOneByEmail(email_usuario);

    if (!usuario) {
      console.error(`Código de restablecimiento inválido para ${email_usuario}: ${codigo}`);
      throw new Error('Código de restablecimiento inválido');
    }

    // Verificar la vigencia del código de restablecimiento
    if (usuario.resetCode !== codigo || usuario.resetExpires < Date.now()) {
      console.error(`El código de restablecimiento ha caducado o es inválido para ${email_usuario}: ${codigo}`);
      throw new Error('El código de restablecimiento ha caducado o es inválido');
    }

    console.log(`Usuario encontrado para ${email_usuario}:`, usuario);

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(nuevaContraseña, 12);

    // Ejecutar una consulta SQL para actualizar la contraseña en la base de datos
    const [result] = await pool.execute(
      'UPDATE usuario SET password = ? WHERE email_usuario = ?',
      [hashedPassword, email_usuario]
    );

    // Verificar si la actualización fue exitosa
    if (result.affectedRows === 0) {
      throw new Error('No se pudo cambiar la contraseña');
    }

    // Limpiar el código de restablecimiento y la marca de tiempo de expiración
    usuario.resetCode = null;
    usuario.resetExpires = null;

    return { success: 'Contraseña restablecida con éxito' };
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    throw error;
  }
};


async function estadoDeUsuario(idUsuario, nuevoUsuarioData, idperfil) {
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
      'UPDATE usuario SET estado = ?, idperfil = ? WHERE idUsuario = ?',
      [
        usuarioActualizado.estado,
        idperfil, // Utiliza el idperfil proporcionado
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


//cerrar sesion
const cerrarSesion = async (token) => {
  try {
    // Verificar si el token está en la lista negra en la base de datos
    const tokenEnListaNegra = await listaNegraService.tokenEnListaNegra(token);
    if (tokenEnListaNegra) {
      console.log('Token ya revocado.');
      throw new Error('Token already revoked.');
    }

    // Agregar el token a la lista negra
    await listaNegraService.agregarToken(token);
    console.log('Token agregado a la lista negra:', token);

    // Otras operaciones de cierre de sesión según sea necesario

    return { success: true, message: 'Logout successful.' };
  } catch (error) {
    console.error(error);
    throw new Error(`Error al cerrar sesión: ${error.message}`);
  }
}
module.exports = {
    crearUsuario,
    obtenerUsuarios,
    loginUser,
    editarUsuario,
    eliminarUsuario,
    cambiarContraseña,
    generarCodigoRestablecimiento,
   enviarCorreoRestablecimiento,
   restablecerContraseña,
   estadoDeUsuario,
   cerrarSesion
};
