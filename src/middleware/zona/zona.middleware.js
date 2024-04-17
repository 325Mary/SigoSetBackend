

const validateZonaFormMiddleware = async (req, res, next) => {
    const { Nombre_zona } = req.body;
    console.log('middle')

    // Verifica que se proporcione el campo Nombre_zona
    if (!Nombre_zona) {
        return res.status(400).json({ message: "Debe proporcionar el campo Nombre_zona." });
    }

    // Verifica que no se proporcionen campos adicionales
    const allowedFields = ['Nombre_zona'];
    const unexpectedFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
    if (unexpectedFields.length > 0) {
        return res.status(400).json({ message: "No se permiten campos adicionales en la solicitud." });
    }

    // Si todo está en orden, pasa al siguiente middleware
    next();
};


module.exports = {
    validateZonaFormMiddleware
  };
  
