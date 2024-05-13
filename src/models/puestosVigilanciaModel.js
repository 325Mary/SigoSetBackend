const mysql = require('mysql2');


const pool = require('../config/database');

const PuestosVigilancia = {
  findAll: function() {
    return pool.execute('SELECT * FROM puestos_vigilancia'); // Utiliza pool.execute() para obtener una promesa
  },
};
