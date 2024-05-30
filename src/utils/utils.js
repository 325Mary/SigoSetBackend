// utils.js (assuming 'jsonwebtoken' is installed)
const jwt = require('jsonwebtoken');

function crearToken(user) {
    const { idUsuario, email_usuario, nombre_usuario, identificacion } = user;
    const payload = { userId: idUsuario, email_usuario, nombre_usuario, identificacion };
    const secret = process.env.JWT_SECRET; // Ensure secret is stored securely
    const options = { expiresIn: '1h' }; // Set appropriate token expiration time
    const token = jwt.sign(payload, secret, options);
    return token;
}

module.exports = { crearToken };