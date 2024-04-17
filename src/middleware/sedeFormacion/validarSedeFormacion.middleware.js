
const pool = require('../../config/database')
const validateSedeFormacionMiddleware = async (req, res, next) => {
    const { idcentro_formacion, idmunicipio, sede_formacion,
      dir_sede_formacion, telefono_sedef, email_sedef
    } = req.body;
    console.log('validateSedeFormacionMiddleware');
    // Verifica que se proporcionen todos los campos requeridos
    if (!idcentro_formacion || !idmunicipio || !sede_formacion || !dir_sede_formacion || !telefono_sedef || !email_sedef) {
      return res.status(400).json({message:"Debe proporcionar todos los campos requeridos."});
    }
     // Verifica que el idcentro_formacion existe en la base de datos
  const centroFormacionExists = await pool.query(
    "SELECT COUNT(*) AS count FROM centro_formacion WHERE idcentro_formacion = ?",
    [idcentro_formacion]
  );
    if (centroFormacionExists[0].count === 0) {
        return res.status(404).json({message:"El centro  formacion proporcionado no existe."});
      }
  
    // Verifica que el idmunicipio existe en la base de datos
  const municipioExists = await pool.query(
    "SELECT COUNT(*) AS count FROM municipio WHERE idmunicipio = ?",
    [idmunicipio]
  );
  if (municipioExists[0].count === 0) {
    return res.status(404).json({message:"El municipio  proporcionado no existe."});
  }
    // Verifica que no se proporcionen campos adicionales
    const allowedFields = ['idcentro_formacion', 'idmunicipio', 'sede_formacion', 'dir_sede_formacion', 'telefono_sedef', 'email_sedef'];
    const unexpectedFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
    if (unexpectedFields.length > 0) {
        return res.status(400).json({message:"No se permiten campos adicionales en la solicitud."});
    }
  
    // Si todo está en orden, pasa al siguiente middleware
    next();
  };
  
  module.exports = {
    validateSedeFormacionMiddleware
  };
  