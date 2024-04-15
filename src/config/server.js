// Importación de módulos y configuraciones necesarios para el servidor
const express = require("express");
const usuarioRoutes = require('../routes/usuario.routes')
const perfilRoutes = require('../routes/perilRoutes')

// Configuración del servidor Express
const appSigoSet = express();
const port = 3000;

appSigoSet.use(express.json());

appSigoSet.use(usuarioRoutes);
appSigoSet.use(perfilRoutes);

appSigoSet.set("port", process.env.PORT || port);

module.exports = appSigoSet;
