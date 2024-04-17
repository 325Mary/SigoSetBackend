// const { crearUsuario,
//    obtenerUsuarios, 
//    loginUser,
//    editarUsuario,
//    eliminarUsuario } = require('../services/usuario.service');
// const validarCamposRequeridos = require('../middleware/camposrequeridosUser');

// const controller = {}

// controller.crearUsuarioC = async (req, res, next) => {
//   try {
//     // Llama al middleware para validar los campos requeridos
//     validarCamposRequeridos(req, res, async () => {
//       const usuarioData = req.body;
//       const usuario = await crearUsuario(usuarioData);
//       res.status(201).json({ message: 'Usuario creado exitosamente', usuario });
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// controller.obtenerUsuariosC = async (req, res, next) => {
//   try {
//     const usuarios = await obtenerUsuarios();
//     res.status(200).json(usuarios);
//   } catch (error) {
//     res.status(404).json({ error: 'No se  obtuvieron los usuarios' });;
//   }
// };

// controller.postLogin = async (req, res) => {
//   await loginUser(req, res);
// };


// controller.editarUsuarioC = async (req, res, next) => {
//   try {
//     const idUsuario = req.params.idUsuario; // Obtener el ID del usuario de los parámetros de la solicitud
//     const nuevoUsuarioData = req.body; // Obtener los nuevos datos del usuario de la solicitud

//     // Llamar a la función del servicio para editar el usuario
//     const usuarioActualizado = await editarUsuario(idUsuario, nuevoUsuarioData);

//     res.status(200).json({ message: 'Usuario actualizado exitosamente', usuario: usuarioActualizado });
//   } catch (error) {
//     res.status(404).json({ error: 'No se Actualizo ningún usuario con el ID proporcionado' });;
//   }
// };

// controller.eliminarUsuarioC = async (req, res, next) => {
//   try {
//     const idUsuario = req.params.idUsuario; // Obtener el ID del usuario de los parámetros de la solicitud
//     await eliminarUsuario(idUsuario);
//     res.status(200).json({ message: 'Usuario eliminado exitosamente' });
//   } catch (error) {
//     res.status(404).json({ error: 'No se encontró ningún usuario con el ID proporcionado' }); // Mensaje de error personalizado
//   }
// };

// module.usuarioController = controller;

const {
    findOneByEmail,
    findByPk,
    getAllUsuarios,
    deleteById,
    createUsuario,
    listarUsuarios,
    // crearToken,
    editarUsuario,
    loginUser,
    // Usuario,
} = require('../services/usuario.service'); // Assuming relative path to controller


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const Usuario = require('../models/usuario.model');
const { validationResult } = require('express-validator'); // Assuming validation rules are defined elsewhere
const validarCamposRequeridos = require('../middleware/camposrequeridosUser.js');
const verificarToken = require('../middleware/verificar-token.js');

// Create a new user
usuarioController.createUsuario = async(req, res) => {
    try {
        const errores = validationResult(req); // Validate user data

        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }

        const usuarioData = req.body;
        const usuarioCreado = await Usuario.createUsuario(usuarioData);
        res.json(usuarioCreado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
};

// Find a user by email
usuarioController.findOneByEmail = async(req, res) => {
    try {
        const { email_usuario } = req.params;
        const usuario = await Usuario.findOneByEmail(email_usuario);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar usuario por email' });
    }
};

// Find a user by ID (assuming route parameter is `idUsuario`)
usuarioController.findByPk = async(req, res) => {
    try {
        const { idUsuario } = req.params;
        const usuario = await Usuario.findByPk(idUsuario);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar usuario por ID' });
    }
};

usuarioController.getAllUsuarios = async(req, res) => {
    try {
        const usuarios = await usuarioService.findAllUsuarios();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
}


// Delete a user by ID
usuarioController.deleteById = async(req, res) => {
    try {
        const { idUsuario } = req.params;
        await Usuario.deleteById(idUsuario);
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};

// Update a user
usuarioController.editarUsuario = async(req, res) => {
    try {
        const { idUsuario } = req.params;
        const nuevoUsuarioData = req.body;

        const errores = validationResult(req); // Validate updated user data

        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }

        const usuarioActualizado = await Usuario.editarUsuario(idUsuario, nuevoUsuarioData);
        res.json(usuarioActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
};

// Get all users
usuarioController.listarUsuarios = async(req, res) => {
    try {
        const usuarios = await Usuario.listarUsuarios();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener lista de usuarios' });
    }
};


// Login a user
usuarioController.loginUser = async(req, res) => {
    try {
        const { email_usuario, password } = req.body;

        // Assuming validation for email and password is done elsewhere
        const user = await Usuario.findOneByEmail(email_usuario);
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = await Usuario.crearToken(user);
        res.json({
            success: 'Inicio de sesión correcto',
            token: token,
            userId: user.idUsuario,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Protected route example (assuming you have a 'protegerRuta' middleware that verifies the token)
usuarioController.protectedRoute = async(req, res) => {
    try {
        // Access the user object from the decoded token (req.user)
        const { nombre_usuario } = req.user;
        res.json({ message: `Bienvenido, ${nombre_usuario}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = usuarioController;