const mysql = require('mysql2');


const pool = require('../config/database');

const vigilanciaElectronica = {
  findAll: function() {
    return pool.execute('SELECT * FROM vigilancia_electronica'); // Utiliza pool.execute() para obtener una promesa
  },
  create: async function(vigilanciaElectronicaData) {
    const sql = `INSERT INTO vigilancia_electronica (descripcion, tarifa, ays, total) VALUES (?, ?, ?, ?)`;
    try {
        const [result] = await pool.execute(sql, [
            vigilanciaElectronicaData.descripcion, 
            vigilanciaElectronicaData.tarifa, 
            vigilanciaElectronicaData.ays, 
            vigilanciaElectronicaData.total
        ]);
        
        if (result.affectedRows === 1) {
            const nuevaVigilanciaElectronica = {
                id: result.insertId,
                descripcion: vigilanciaElectronicaData.descripcion,
                tarifa: vigilanciaElectronicaData.tarifa,
                ays: vigilanciaElectronicaData.ays,
                total: vigilanciaElectronicaData.total
            };
            return nuevaVigilanciaElectronica;
        } else {
            throw new Error('No se pudo crear la vigilancia electrónica');
        }
    } catch (error) {
        throw error;
    }
  }


};
async function findOneVigilanciaElectronica(descripcion) {
  const [rows, fields] = await pool.execute('SELECT * FROM vigilancia_electronica WHERE descripcion = ?', [descripcion]);
  return rows[0];
}


async function findByVigilanciaElectronica (idvigilancia_electronica) {
    const [rows, fields] = await pool.execute(`SELECT * FROM vigilancia_electronica WHERE idvigilancia_electronica = ?` , [idvigilancia_electronica]);
    return rows[0];    throw error;
  }

async function deleteByIdVigilanciaElectronica(idvigilancia_electronica) {
    try {
      const [result] = await pool.execute('DELETE FROM vigilancia_electronica WHERE idvigilancia_electronica = ?', [idvigilancia_electronica]);
      if (result.affectedRows === 0) {
        throw new Error('la vigilancia electronica seleecionada no existe');
      }
      return { message: 'municipio eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  


module.exports = {vigilanciaElectronica,
    findOneVigilanciaElectronica,
    findByVigilanciaElectronica,
    deleteByIdVigilanciaElectronica};
