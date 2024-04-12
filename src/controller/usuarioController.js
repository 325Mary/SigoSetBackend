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
const { ResponseStructure } = require('../helpers/ResponseStructure'); // Asegúrate de ajustar la ruta correcta
const controller = {}

controller.crearUsuarioC = async (req, res, next) => {
  try {
    validarCamposRequeridos(['idperfil', 'idcentro_formacion', 'identificacion', 'nombre_usuario', 'apellido_usuario', 'telefono_usuario', 'email_usuario', 'password', 'estado'])(req, res, async () => {
      const usuarioData = req.body;

      // Verificar si el correo electrónico ya existe en la base de datos
      const existingUser = await findOneByEmail(usuarioData.email_usuario);
      if (existingUser) {
        return res.status(400).json({ ...ResponseStructure, status: 400, message: 'El correo electrónico ya está registrado' });
      }


      const usuario = await crearUsuario(usuarioData);
      res.status(201).json({ ...ResponseStructure, message: 'Usuario creado exitosamente', data: usuario });
    });
  } catch (error) {
    res.status(500).json({ ...ResponseStructure, status: 500, error: error.message });
  }
};


controller.obtenerUsuariosC = async (req, res, next) => {
 try {
   const usuarios = await obtenerUsuarios();
   res.status(200).json({ ...ResponseStructure, message: 'Usuarios listados correctamente', data: usuarios });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, message: 'No se obtuvieron los usuarios', error });
  }
};

controller.postLogin = async (req, res) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    res.status(500).json({ ...ResponseStructure, status: 500, error: error.message });
  }
};




controller.editarUsuarioC = async (req, res, next) => {
  try {
    const idUsuario = req.params.idUsuario;
    const nuevoUsuarioData = req.body;

    // Verificar si el cuerpo de la solicitud está vacío
    if (Object.keys(nuevoUsuarioData).length === 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, message: 'El cuerpo de la solicitud está vacío' });
    }

    // Definir los campos válidos esperados
    const camposValidos = ['idUsuario', 'idperfil', 'idcentro_formacion', 'identificacion', 'nombre_usuario', 'apellido_usuario', 'telefono_usuario', 'email_usuario', 'password', 'estado'];

    // Verificar si todos los campos recibidos están en la lista de campos válidos
    const camposRecibidos = Object.keys(nuevoUsuarioData);
    const camposInvalidos = camposRecibidos.filter(field => !camposValidos.includes(field));

    if (camposInvalidos.length > 0) {
      return res.status(400).json({ ...ResponseStructure, status: 400, message: 'El cuerpo de la solicitud contiene campos no válidos', invalidFields: camposInvalidos });
    }

    // Si todos los campos son válidos, proceder con la actualización
    const usuarioActualizado = await editarUsuario(idUsuario, nuevoUsuarioData);
    res.status(200).json({ ...ResponseStructure, message: 'Usuario actualizado exitosamente', data: usuarioActualizado });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, message: 'No se actualizó ningún usuario con el ID proporcionado', error });
  }
};


controller.eliminarUsuarioC = async (req, res, next) => {
 try {
   const idUsuario = req.params.idUsuario; // Obtener el ID del usuario de los parámetros de la solicitud
   await eliminarUsuario(idUsuario);
   res.status(200).json({ ...ResponseStructure, message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, message: 'No se encontró ningún usuario con el ID proporcionado', error });
  }
};

// Cambiar contraseña
controller.cambiarContraseñaC = async (req, res) => {
 try {
   const idUsuario = req.params.idUsuario; 
   const { newPassword } = req.body;

   if (!newPassword) {
    return res.status(400).json({ ...ResponseStructure, status: 400, message: 'El campo newPassword está vacío' });
  }


   await cambiarContraseña(idUsuario, newPassword);

   res.status(200).json({ ...ResponseStructure, message: 'Contraseña cambiada exitosamente' });
  } catch (error) {
    res.status(500).json({ ...ResponseStructure, status: 500, error: error.message });
  }
};



controller.solicitarRestablecimiento = async (req, res) => {
 try {
   const { email_usuario } = req.body;

   const usuario = await findOneByEmail(email_usuario);

   if (!usuario) {
    return res.status(404).json({ ...ResponseStructure, status: 404, message: 'Usuario no encontrado' });
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

   res.json({ ...ResponseStructure, message: 'Solicitud de restablecimiento enviada con éxito' });
  } catch (error) {
    console.error('Error al solicitar restablecimiento:', error);
    res.status(500).json({ ...ResponseStructure, status: 500, error: 'Error interno del servidor' });
  }
};


controller.restablecerContraseña = async (req, res) => {
 try {
   const { email_usuario, codigo, nuevaContraseña } = req.body;

   console.log(`Solicitud de restablecimiento de contraseña para ${email_usuario} con código ${codigo}`);

   // Llamar a la función restablecerContraseña
   const resultado = await restablecerContraseña(email_usuario, codigo, nuevaContraseña);
   res.json({ ...ResponseStructure, message: 'Accion Exitosa',  data: resultado });
   // Enviar respuesta al cliente
   res.json(resultado);
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ ...ResponseStructure, status: 500, error: 'Error interno del servidor' });
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
    return res.status(400).json({ ...ResponseStructure, status: 400, error: 'Los datos del usuario están incompletos' });
  }

   // Llamar a la función del servicio para editar el usuario
   const usuarioActualizado = await estadoDeUsuario(idUsuario, nuevoUsuarioData, idperfil);

   res.status(200).json({ ...ResponseStructure, message: 'Usuario actualizado exitosamente', data: usuarioActualizado });
  } catch (error) {
    res.status(404).json({ ...ResponseStructure, status: 404, error: 'No se actualizó ningún usuario con el ID proporcionado' });
  }
};


controller.cerrarSesionC = async (req, res, next) => {
 try {
   const authorizationHeader = req.headers.authorization;
   if (!authorizationHeader) {
    return res.status(401).json({ ...ResponseStructure, status: 401, error: 'No se proporcionó un token de autenticación' });
  }

   const token = req.headers['authorization']; // Obtener el token del encabezado de la solicitud

   // Llamar al servicio de cierre de sesión
   await cerrarSesion(token);

   res.status(200).json({ ...ResponseStructure, message: 'Sesión cerrada exitosamente' });
  } catch (error) {
    next(error);
  }
};



module.exports = controller;
