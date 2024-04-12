// Importación de módulos y configuraciones necesarios para el servidor
const express = require("express");
const morgan = require('morgan');
const usuarioRoutes = require('../routes/usuario.routes')
const centroFormacionRoutes = require('../routes/centroFormacion.routes')
// Configuración del servidor Express
const appSigoSet = express();
const port = 3000;

appSigoSet.use(express.json());

appSigoSet.use(usuarioRoutes);
appSigoSet.use(centroFormacionRoutes)
appSigoSet.use(morgan("dev"));
appSigoSet.set("port", process.env.PORT || port);

module.exports = appSigoSet;
