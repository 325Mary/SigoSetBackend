// Importación de módulos y configuraciones necesarios para el servidor
const express = require("express");
const morgan = require('morgan');
const usuarioRoutes = require('../routes/usuarioRoutes')
const municipioRoutes = require('../routes/municipioRoutes')
// const centroFormacionRoutes = require('../routes/centroFormacion.routes')
// const zonaRoutes = require('../routes/zona.routes')
// const regionalRoutes = require("../routes/regional.routes")
const regionalRoutes = require("../routes/RegionalRoutes")
const sedeFormacionRoutes = require("../routes/sedeFormacionRoutes ")

    // Configuración del servidor Express
const detalleContratoRoutes= require('../routes/detalleContratoRoutes')
const empresaRoutes= require('../routes/empresaRoutes')
const perfilRoutes = require('../routes/perilRoutes')
const certificacionCentrofRoutes= require ('../routes/certificacionCentroFRoutes')
const zonaRoutes =require('../routes/ZonaRoutes')
const regionalesRoutes = require('../routes/RegionalRoutes')

const appSigoSet = express();
const port = 3000;

appSigoSet.use(express.json());

appSigoSet.use(regionalesRoutes);
appSigoSet.use(usuarioRoutes);
appSigoSet.use(certificacionCentrofRoutes)
appSigoSet.use(perfilRoutes)
// appSigoSet.use(centroFormacionRoutes)
appSigoSet.use(zonaRoutes)
appSigoSet.use(municipioRoutes)
appSigoSet.use(sedeFormacionRoutes)
appSigoSet.use(morgan("dev"));appSigoSet.use(regionalRoutes)
appSigoSet.use(empresaRoutes)
appSigoSet.use(detalleContratoRoutes)


appSigoSet.set("port", process.env.PORT || port);

module.exports = appSigoSet;