const pool = require('../config/database');

const Departamento = {
  findAll: function() {
    return pool.execute('SELECT * FROM departamento'); // Utiliza pool.execute() para obtener una promesa
  },
  findById: function(iddepartamento) {
    return pool.execute('SELECT * FROM departamento WHERE iddepartamento = ?', [iddepartamento]);
},
  create: function(departamentoData) {
    const sql = `INSERT INTO departamento ( departamento) VALUES ( ?)`;
    return pool.execute(sql, [ departamentoData.departamento]);
  },
  update: function(iddepartamento, departamentoData) {
    const sql = 'UPDATE departamento SET departamento = ? WHERE iddepartamento = ?';
    return pool.execute(sql, [departamentoData.departamento, iddepartamento]);
},
deleteById: function(iddepartamento) {
  return pool.execute('DELETE FROM departamento WHERE iddepartamento = ?', [iddepartamento]);
}

};

module.exports = Departamento;
