const pool = require('../config/database');

const blackListedToken = {
  findAll: function() {
    return pool.execute('SELECT * FROM blackListedToken'); // Utiliza pool.execute() para obtener una promesa
  },
  create: function(blackListedTokenData) {
    const sql = `INSERT INTO usuario (id, token, creadted_ad) VALUES (?, ?, ?)`;
    return pool.execute(sql, [blackListedTokenData.id, blackListedTokenData.token, blackListedTokenData.created_ad]);
  }
};

module.exports= {
  blackListedToken
}