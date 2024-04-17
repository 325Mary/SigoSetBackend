const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/database'); // Assuming database connection pool in config/database.js
const { crearToken } = require('../utils/utils');
const {
    findOneByEmail,
    // findByPk,
    deleteById,
    createUsuario,
    listarUsuarios,
    editarUsuario,
    loginUser,
    // crearToken,
    getAllUsuarios,
} = require('../models/usuario.model'); // Assuming relative path to model

// Function to create a new user
async function crearUsuario(usuarioData) {
    try {
        // Validate user data (consider using express-validator for advanced validation)
        if (!usuarioData || Object.keys(usuarioData).length === 0) {
            throw new Error('Faltan datos del usuario');
        }

        // Hash the password securely
        const hashedPassword = await bcrypt.hash(usuarioData.password, 10);
        usuarioData.password = hashedPassword;

        // Connect to the database using the pool
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            // Create a new user using database query (replace with your specific query)
            const [result] = await connection.query('INSERT INTO usuarios SET ?', usuarioData);
            const nuevoUsuarioId = result.insertId;

            // Commit the transaction
            await connection.commit();

            // Return the created user with ID (assuming you retrieve it from the query)
            return {...usuarioData, idUsuario: nuevoUsuarioId };

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }

    } catch (error) {
        throw error;
    }
}

// Function to find a user by email
// async function findOneByEmail(email_usuario) {
//     try {
//         // Connect to the database using the pool
//         const connection = await pool.getConnection();

//         // Find the user by email using database query (replace with your specific query)
//         const [rows] = await connection.query('SELECT * FROM usuarios WHERE email_usuario = ?', [email_usuario]);
//         const usuario = rows[0];

//         connection.release();

//         return usuario;
//     } catch (error) {
//         throw error;
//     }
// }

// Function to find a user by ID
// async function findByPk(idUsuario) {
//     try {
//         // Connect to the database using the pool
//         const connection = await pool.getConnection();

//         // Find the user by ID using database query (replace with your specific query)
//         const [rows] = await connection.query('SELECT * FROM usuarios WHERE idUsuario = ?', [idUsuario]);
//         const usuario = rows[0];

//         connection.release();

//         return usuario;
//     } catch (error) {
//         throw error;
//     }
// }

// Function to delete a user by ID

// usuario.service.js


async function deleteById(req, res) { // Consider a more descriptive name
    const idUsuario = req.params.id; // Assuming ID comes from request parameters

    const deletedCount = await deleteById(idUsuario); // Use imported function

    res.json({
        message: deletedCount > 0 ? 'Usuario eliminado' : 'Usuario no encontrado', // Handle deletion status
    });
}


// async function deleteById(idUsuario) {
//     try {
//         // Connect to the database using the pool
//         const connection = await pool.getConnection();
//         await connection.beginTransaction();

//         try {
//             // Delete the user by ID using database query (replace with your specific query)
//             await connection.query('DELETE FROM usuarios WHERE idUsuario = ?', [idUsuario]);

//             // Commit the transaction
//             await connection.commit();

//             return { message: 'Usuario eliminado exitosamente' };

//         } catch (error) {
//             await connection.rollback();
//             throw error;
//         } finally {
//             connection.release();
//         }

//     } catch (error) {
//         throw error;
//     }
// }

// Function to update a user
async function editarUsuario(idUsuario, nuevoUsuarioData) {
    try {
        // Connect to the database using the pool
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            // Update user data using database query (replace with your specific query)
            await connection.query('UPDATE usuarios SET ? WHERE idUsuario = ?', [nuevoUsuarioData, idUsuario]);

            // Commit the transaction
            await connection.commit();

            // Return the updated user (consider retrieving updated data after update if needed)
            return {...nuevoUsuarioData, idUsuario };

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }

    } catch (error) {
        throw error;
    }
}

// Function to get all users
async function listarUsuarios() {
    try {
        // Connect to the database using the pool
        const connection = await pool.getConnection();

        // Get all users using database query (replace with your specific query)
        const [rows] = await connection.query('SELECT * FROM usuarios');
        const usuarios = rows;

        connection.release();

        return usuarios;
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

        const usuario = await findOneByEmail(email_usuario);

        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const passwordMatch = await bcrypt.compare(password, usuario.password);

        if (passwordMatch) {
            // If passwords match, send authentication token
            res.json({
                success: 'Inicio de sesión correcto',
                token: crearToken(usuario),
                userId: usuario.idUsuario,
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
// async function crearToken(usuario) {
//     const { idUsuario, email_usuario, nombre_usuario, identificacion } = usuario;
//     const payload = { userId: idUsuario, email_usuario, nombre_usuario, identificacion };
//     console.log('Payload:', payload); // Log payload for debugging
//     const secret = process.env.JWT_SECRET;
//     const options = { expiresIn: '1h' };
//     const token = jwt.sign(payload, secret, options);
//     return token;
// }

async function getAllUsuarios() {
    try {
        // Connect to the database using the pool
        const connection = await pool.getConnection();

        // Replace with your specific query to retrieve all users
        const [rows] = await connection.query('SELECT * FROM usuarios');
        const usuarios = rows;

        connection.release();

        return usuarios;
    } catch (error) {
        throw error;
    }
}

// Export the necessary functions
module.exports = {
    findOneByEmail,
    findByPk,
    getAllUsuarios,
    deleteById,
    createUsuario,
    listarUsuarios,
    // crearToken,
    editarUsuario,
    loginUser,
    Usuario, // Include the Usuario model for reference if needed
};