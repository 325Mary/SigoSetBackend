const express = require('express');
const router = express.Router();
const {
    createUsuario,
    findOneByEmail,
    findByPk,
    deleteById,
    getAllUsuarios,
    editarUsuario,
    listarUsuarios,
    loginUser,
    protectedRoute
} = require('../controller/usuario.controller'); // Assuming relative path to controller

// Create new user
router.post('/createUsuario', createUsuario);

// Find user by email
router.get('/usuario/:email_usuario', findOneByEmail);

// Find user by ID
router.get('/usuario/:idUsuario', findByPk);

// Delete user by ID
router.delete('/usuario/:idUsuario', deleteById);

// Update user
router.put('/usuario/:idUsuario', editarUsuario);

// Get all users
router.get('/listarUsuarios', listarUsuarios);
router.get('/getAllUsuarios', getAllUsuarios);

// Login user
router.post('/usuario/login', loginUser);

// Protected route example (assuming you have a 'protegerRuta' middleware that verifies the token)
router.get('/usuario/protegido', protectedRoute);

module.exports = router;