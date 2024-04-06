// models/usuarioModel.js
const mysql = require('mysql2');

// Crea una pool de conexiones
const pool = mysql.createPool({
  host: 'localhost',
  user: 'Mc325',
  password: 'Mc325',
  database: 'dafv2',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Define el modelo de usuario
const Usuario = {
  findAll: function(callback) {
    pool.query('SELECT * FROM usuario', callback);
  },
  create: function(usuarioData, callback) {
    pool.query('INSERT INTO usuario SET ?', usuarioData, callback);
  }
  // Agrega más métodos según sea necesario (actualizar, eliminar, etc.)
};

module.exports = Usuario;
