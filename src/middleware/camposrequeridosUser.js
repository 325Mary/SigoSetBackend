
function validarCamposRequeridos(req, res, next) {
  const camposRequeridos = ['idperfil', 'idcentro_formacion', 'identificacion', 'nombre_usuario', 'apellido_usuario', 'telefono_usuario', 'email_usuario', 'password', 'estado'];
  
  const camposFaltantes = camposRequeridos.filter(campo => !req.body[campo]);

  if (camposFaltantes.length > 0) {
    const errores = camposFaltantes.map(campo => `${campo} es requerido`);
    return res.status(400).json({ error: 'Faltan datos del usuario', errores });
  }

  // Si todos los campos requeridos están presentes, pasar al siguiente middleware o controlador
  next();
}

module.exports = validarCamposRequeridos;
