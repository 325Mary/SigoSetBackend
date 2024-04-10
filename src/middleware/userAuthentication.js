const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const token = req.headers['authorization']; // Obtener el token del encabezado de la solicitud
  
  if (!token) {
    return res.status(403).json({ error: 'Token de autenticación no proporcionado' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Adjuntar los datos del usuario decodificado al objeto de solicitud para que esté disponible en los controladores posteriores
    req.user = decoded;
    req.idperfil = decoded.idperfil;
    
    
    // Pasar al siguiente middleware o controlador
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token de autenticación inválido' });
  }
}

module.exports = verificarToken;
