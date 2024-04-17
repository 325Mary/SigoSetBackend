// Importación de módulos y configuraciones necesarios para el servidor
const express = require("express");
const morgan = require('morgan');
const usuarioRoutes = require('../routes/usuarioRoutes')
const municipioRoutes = require('../routes/municipioRoutes')
const centroFormacionRoutes = require('../routes/centroFormacion.routes')
const zonaRoutes = require('../routes/zona.routes')
const regionalRoutes = require("../routes/regional.routes")
const moduloRoutes = require("../routes/moduloRoutes")
const obligacionesContratistaRoutes = require("../routes/obligacionesContratistaRoutes")
const perfilRoutes = require("../routes/perfilRoutes")
const moduloxperfilRoutes = require("../routes/moduloxperfilRoutes")
const puestosVigilanciaRoutes = require("../routes/puestosVigilanciaRoutes")
    // Configuración del servidor Express
const appSigoSet = express();
const port = 3000;

appSigoSet.use(express.json());
appSigoSet.use(morgan("dev"));

appSigoSet.use(usuarioRoutes);
appSigoSet.use(centroFormacionRoutes)
appSigoSet.use(zonaRoutes)
appSigoSet.use(regionalRoutes)
appSigoSet.use(municipioRoutes);

appSigoSet.use(moduloRoutes);
appSigoSet.use(moduloxperfilRoutes);
appSigoSet.use(perfilRoutes);
appSigoSet.use(obligacionesContratistaRoutes);

appSigoSet.use(puestosVigilanciaRoutes);



appSigoSet.set("port", process.env.PORT || port);

module.exports = appSigoSet;