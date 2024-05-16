const { validarCamposRequeridos } = require('./validar-campos-requeridos');
const { verificarToken } = require('./verificar-token'); // Supongamos que existe un middleware 'verificarToken' para verificar el token de autenticación
const { validarPermisosRegionales } = require('./validar-permisos-regionales'); // Supongamos que existe un middleware 'validarPermisosRegionales' para verificar los permisos regionales

module.exports = (req, res, next) => {
    // Validar campos requeridos comunes (usuario, contraseña, etc.)
    validarCamposRequeridos(['usuario', 'contrasena'])(req, res, next);

    // Verificar token de autenticación
    verificarToken(req, res, next);

    // Validar permisos regionales según el endpoint y el usuario
    validarPermisosRegionales(req, res, next);
};