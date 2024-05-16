// function validarCamposRequeridos(req, res, camposRequeridos) {
//     const faltanCampos = [];
//     camposRequeridos.forEach(campo => {
//         if (!req.body[campo]) {
//             faltanCampos.push(campo);
//         }
//     });

//     if (faltanCampos.length > 0) {
//         return res.status(400).json({ message: `Faltan campos obligatorios: ${faltanCampos.join(', ')}` });
//     }
//     next();
//     next(new Error('Missing required fields'));
// }

// module.exports = validarCamposRequeridos;
function validarCamposRequeridos(req, res, camposRequeridos) {
    const faltanCampos = [];
    camposRequeridos.forEach(campo => {
        if (!req.body[campo]) {
            faltanCampos.push(campo);
        }
    });

    if (faltanCampos.length > 0) {
        return res.status(400).json({ message: `Faltan campos obligatorios: ${faltanCampos.join(', ')}` });
    }
    // No need to call next here, as you're already sending a response with res.status
}

module.exports = validarCamposRequeridos;