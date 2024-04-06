// Importación de módulos y configuraciones necesarios para el servidor
const express = require("express");
const usuarioRoutes = require('../routes/usuario.routes')
// Configuración del servidor Express
const appSigoSet = express();
const port = 3000;

appSigoSet.use(usuarioRoutes)

appSigoSet.set("port", process.env.PORT || port);

module.exports = appSigoSet;
