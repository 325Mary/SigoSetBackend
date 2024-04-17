const pool = require('../config/database'); // Assuming database connection pool
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const mongoose = require("mongoose");


const uarioSchema = new mongoose.schema({
    idUsuario: {
        type: 'INT',
        primaryKey: true,
        autoIncrement: true,
    },
    idperfil: {
        type: 'INT',
    },
    idcentro_formacion: {
        type: 'INT',
    },
    identificacion: {
        type: 'VARCHAR(30)',
        unique: true, // Enforce unique identification
    },
    nombre_usuario: {
        type: 'VARCHAR(60)',
    },
    apellido_usuario: {
        type: 'VARCHAR(60)',
    },
    telefono_usuario: {
        type: 'VARCHAR(20)',
    },
    email_usuario: {
        type: 'VARCHAR(65)',
        unique: true, // Enforce unique email
    },
    password: {
        type: 'VARCHAR(300)', // Assuming hashed password storage
    },
    estado: {
        type: 'VARCHAR(255)', // Adjust data type for state values
    },
});
const Usuario = mongoose.model('Usuario', usuarioSchema);

async function createUsuario(usuarioData) {
    try {
        const hashedPassword = await bcrypt.hash(usuarioData.password, 10);
        const [result] = await pool.execute(
            'INSERT INTO usuarios (idperfil, idcentro_formacion, identificacion, nombre_usuario, apellido_usuario, telefono_usuario, email_usuario, password, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                usuarioData.idperfil,
                usuarioData.idcentro_formacion,
                usuarioData.identificacion,
                usuarioData.nombre_usuario,
                usuarioData.apellido_usuario,
                usuarioData.telefono_usuario,
                usuarioData.email_usuario,
                hashedPassword,
                usuarioData.estado,
            ]
        );
        return { message: 'Usuario creado exitosamente' }; // Return a success message
    } catch (error) {
        throw error;
    }
}

// Function to find a user by email
async function findOneByEmail(email_usuario) {
    try {
        const [result] = await pool.execute('SELECT * FROM usuarios WHERE email_usuario = ?', [email_usuario]);
        return result[0] || null; // Return user object or null if not found
    } catch (error) {
        throw error;
    }
}

// Function to find a user by ID
// async function findByPk(idUsuario) {
//     try {
//         const [result] = await pool.execute('SELECT * FROM usuarios WHERE idUsuario = ?', [idUsuario]);
//         return result[0] || null; // Return user object or null if not found
//     } catch (error) {
//         throw error;
//     }
// }

// Function to delete a user by ID
async function deleteById(idUsuario) {
    try {
        const [result] = await pool.execute('DELETE FROM usuarios WHERE idUsuario = ?', [idUsuario]);
        if (result.affectedRows === 0) {
            throw new Error('No se encontró ningún usuario con el ID proporcionado');
        }
        return { message: 'Usuario eliminado exitosamente' };
    } catch (error) {
        throw error;
    }
}
// Function to update a user
async function editarUsuario(idUsuario, nuevoUsuarioData) {
    try {
        const usuarioExistente = await findByPk(idUsuario);
        if (!usuarioExistente) {
            throw new Error('El usuario no existe');
        }

        const usuarioActualizado = {...usuarioExistente, ...nuevoUsuarioData };

        const [result] = await pool.execute(
            'UPDATE usuarios SET idperfil = ?, idcentro_formacion = ?, identificacion = ?, nombre_usuario = ?, apellido_usuario = ?, telefono_usuario = ?, email_usuario = ?, password = ?, estado = ? WHERE idUsuario = ?', [
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

        if (result.affectedRows === 0) {
            throw new Error('No se pudo actualizar el usuario');
        }

        return usuarioActualizado;
    } catch (error) {
        throw error;
    }
}

async function getAllUsuarios() {
    try {
        const [rows] = await pool.execute('SELECT * FROM usuarios');
        return rows;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw for handling in upper layers
    }
}

// Function to get all users
async function listarUsuarios() {
    try {
        const [Usuario] = await pool.execute('SELECT * FROM usuarios');
        return Usuario;
    } catch (error) {
        throw error;
    }
}

// Function to login a user
async function loginUser(req, res) {
    try {
        const { email_usuario, password } = req.body;

        if (!email_usuario || !password) {
            return res.status(400).json({ error: 'El correo electrónico y la contraseña son requeridos' });
        }

        const user = await findOneByEmail(email_usuario);

        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // If passwords match, send authentication token
            res.json({
                success: 'Inicio de sesión correcto',
                token: crearToken(user),
                userId: user.idUsuario,
            });
        } else {
            // If passwords don't match, send invalid credentials error
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Function to create an authentication token
// async function crearToken(user) {
//     const { idUsuario, email_usuario, nombre_usuario, identificacion } = user;
//     const payload = { userId: idUsuario, email_usuario, nombre_usuario, identificacion };
//     console.log('Payload:', payload); // Log payload for debugging
//     const secret = process.env.JWT_SECRET;
//     const options = { expiresIn: '1h' };
//     const token = jwt.sign(payload, secret, options);
//     return token;
// }

// Export the Usuario model and necessary functions
module.exports = {
    findOneByEmail,
    // findByPk,
    deleteById,
    createUsuario,
    listarUsuarios,
    editarUsuario,
    loginUser,
    // crearToken,
    getAllUsuarios,
    // findAll,
    Usuario,
};