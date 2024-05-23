function validarCamposPuesto(req, res, next) {
    const camposRequeridos = ["descripcion_puesto", "tarifa_puesto"];
    const camposFaltantes = camposRequeridos.filter(campo => !(campo in req.body));
    
    if (camposFaltantes.length > 0) {
      return res.status(400).json({
        error: "La solicitud es incorrecta. Faltan los siguientes campos:",
        errores: camposFaltantes,
      });
    }
    
    next();
  }
  
  module.exports = validarCamposPuesto;
  