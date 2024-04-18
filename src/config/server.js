// Importación de módulos y configuraciones necesarios para el servidor
const express = require("express");
const usuarioRoutes = require('../routes/usuarioRoutes')
const detalleContratoRoutes= require('../routes/detalleContratoRoutes')
const empresaRoutes= require('../routes/empresaRoutes')
const perfilRoutes = require('../routes/perilRoutes')
const zonasRoutes =require('../routes/zona.routes')

// Configuración del servidor Express
const appSigoSet = express();
const port = 3000;

appSigoSet.use(express.json());

appSigoSet.use(usuarioRoutes);
appSigoSet.use(perfilRoutes);
appSigoSet.use(empresaRoutes)
appSigoSet.use(detalleContratoRoutes)
appSigoSet.use(zonasRoutes)

appSigoSet.set("port", process.env.PORT || port);

module.exports = appSigoSet;