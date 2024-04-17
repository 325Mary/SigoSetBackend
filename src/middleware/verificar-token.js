const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado. Se requiere un token de autenticación.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Añadir el usuario decodificado al objeto de solicitud
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado. Acceso no autorizado.' });
    }
};