// // const jwt = require('jsonwebtoken');

// // function verificarToken(req, res, next) {
// //   const token = req.headers['authorization']; // Obtener el token del encabezado de la solicitud
  
// //   if (!token) {
// //     return res.status(403).json({ error: 'Token de autenticación no proporcionado' });
// //   }

// //   try {
// //     // Verificar y decodificar el token
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
// //     // Adjuntar los datos del usuario decodificado al objeto de solicitud para que esté disponible en los controladores posteriores
// //     req.user = decoded;
// //     req.idperfil = decoded.idperfil;
    
    
// //     // Pasar al siguiente middleware o controlador
// //     next();
// //   } catch (error) {
// //     return res.status(401).json({ error: 'Token de autenticación inválido' });
// //   }
// // }

// // module.exports = verificarToken;


// const jwt = require('jsonwebtoken');
// const { listaNegraService } = require('../services/listaNegra.service');

// async function verificarToken(req, res, next) {
//   const token = req.headers['authorization']; // Obtener el token del encabezado de la solicitud

//   if (!token) {
//     return res.status(403).json({ error: 'Token de autenticación no proporcionado' });
//   }

//   try {
//     // Verificar y decodificar el token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // Verificar si el token está en la lista negra
//     const enListaNegra = await listaNegraService.tokenEnListaNegra(token);
//     if (enListaNegra) {
//       return res.status(401).json({ error: 'El token de autenticación ha sido revocado' });
//     }

//     // Adjuntar los datos del usuario decodificado al objeto de solicitud
//     req.user = decoded;
//     req.idperfil = decoded.idperfil;
    
//     // Pasar al siguiente middleware o controlador
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: 'Token de autenticación inválido' });
//   }
// }

// module.exports = verificarToken;



const jwt = require('jsonwebtoken');
const  {listaNegraService}  = require('../services/listaNegraService')


const validarTokenMiddleware = async (req, res, next) => {
  try {
    if (!req || !req.headers || !req.headers.authorization) {
      return res.status(401).json({ error: 'Token no proporcionado'  });
    }

    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    // const tokenBearer = token.split(' ')[1];
    const tokenEnListaNegra = await listaNegraService.tokenEnListaNegra(token);
    if (tokenEnListaNegra) {
      return res.status(401).json({ error: 'El token está en la lista negra' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token no válido' });
      }
      req.user = decoded;
      
  // Adjuntar los datos del usuario decodificado al objeto de solicitud
  req.user = decoded;
  req.idperfil = decoded.idperfil;
     
      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en validarTokenMiddleware' });
  }
};


module.exports = validarTokenMiddleware;
