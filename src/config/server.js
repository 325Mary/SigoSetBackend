// Importación de módulos y configuraciones necesarios para el servidor
const express = require("express");
const morgan = require('morgan');
const cors = require("cors");
const usuarioRoutes = require('../routes/usuarioRoutes')
const municipioRoutes = require('../routes/municipioRoutes')
// const centroFormacionRoutes = require('../routes/centroFormacion.routes')
// const zonaRoutes = require('../routes/zona.routes')
const regionalRoutes = require("../routes/regional.routes")
const sedeFormacionRoutes = require("../routes/sedeFormacion.routes ")

    // Configuración del servidor Express
const detalleContratoRoutes= require('../routes/detalleContratoRoutes')
const empresaRoutes= require('../routes/empresaRoutes')
const perfilRoutes = require('../routes/perilRoutes')
const certificacionCentrofRoutes= require ('../routes/certificacionCentroFRoutes')

const appSigoSet = express();
const port = 3000;
appSigoSet.use(cors());
appSigoSet.use(express.json());

appSigoSet.use(usuarioRoutes);
// appSigoSet.use(centroFormacionRoutes)
// appSigoSet.use(zonaRoutes)
appSigoSet.use(municipioRoutes)
appSigoSet.use(sedeFormacionRoutes)
appSigoSet.use(morgan("dev"));appSigoSet.use(regionalRoutes)
appSigoSet.use(empresaRoutes)
appSigoSet.use(detalleContratoRoutes)
appSigoSet.use(certificacionCentrofRoutes)


appSigoSet.set("port", process.env.PORT || port);


module.exports = appSigoSet;