// Importa el módulo mysql2 para interactuar con MySQL
const mysql = require("mysql2");

// Crea la conexión a la base de datos MySQL
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'dafv2',
  port:3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Ejecuta una consulta SQL para verificar la conexión
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conexión exitosa a MySQL:', rows[0].solution);
});

// No es necesario llamar a connection.end() ya que estás usando una pool de conexiones
