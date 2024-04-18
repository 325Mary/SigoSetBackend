// Importación de módulos y configuraciones necesarios para el servidor
const express = require("express");
<<<<<<< HEAD
const morgan = require('morgan');
const usuarioRoutes = require('../routes/usuarioRoutes')
const municipioRoutes = require('../routes/municipioRoutes')
const centroFormacionRoutes = require('../routes/centroFormacion.routes')
const zonaRoutes = require('../routes/zona.routes')
const regionalRoutes = require("../routes/regional.routes")
const sedeFormacionRoutes = require("../routes/sedeFormacion.routes ")

    // Configuración del servidor Express
=======
const usuarioRoutes = require('../routes/usuario.routes')
const perfilRoutes = require('../routes/perilRoutes')

// Configuración del servidor Express
>>>>>>> origin/35-crear-crud-de-perfiles
const appSigoSet = express();
const port = 3000;

appSigoSet.use(express.json());

appSigoSet.use(usuarioRoutes);
<<<<<<< HEAD
appSigoSet.use(centroFormacionRoutes)
appSigoSet.use(zonaRoutes)
appSigoSet.use(municipioRoutes)
appSigoSet.use(sedeFormacionRoutes)
appSigoSet.use(morgan("dev"));appSigoSet.use(regionalRoutes)
=======
appSigoSet.use(perfilRoutes);
>>>>>>> origin/35-crear-crud-de-perfiles

appSigoSet.set("port", process.env.PORT || port);

module.exports = appSigoSet;