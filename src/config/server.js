// Importación de módulos y configuraciones necesarios para el servidor
const express = require("express");
const morgan = require('morgan');
const regionalRoutes = require("../routes/regional.routes")
const moduloRoutes = require("../routes/moduloRoutes")
const moduloxperfilRoutes = require("../routes/moduloxperfilRoutes")
const puestosvigilanciaRoutes = require("../routes/puestosVigilanciaRoutes")


const appSigoSet = express();
const port = 3000;

appSigoSet.use(regionalRoutes)
appSigoSet.use(moduloRoutes)
appSigoSet.use(moduloxperfilRoutes)
appSigoSet.use(puestosvigilanciaRoutes)



appSigoSet.set("port", process.env.PORT || port);

module.exports = appSigoSet;