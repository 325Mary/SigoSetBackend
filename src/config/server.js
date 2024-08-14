const express = require("express");
const morgan = require('morgan');
const cors = require("cors");
const path = require('path');


const usuarioRoutes = require('../routes/usuarioRoutes')
const municipioRoutes = require('../routes/municipioRoutes')
const obligacionesContratistaRoutes=  require('../routes/obligacionContratistaRoutes')
const regionalRoutes = require("../routes/RegionalRoutes")
const sedeFormacionRoutes = require('../routes/SedeFormacionRoutes')
const detalleContratoRoutes = require('../routes/detalleContratoRoutes')
const empresaRoutes = require('../routes/empresaRoutes')
const perfilRoutes = require('../routes/perilRoutes')
const certificacionCentrofRoutes = require('../routes/certificacionCentroFRoutes')
const zonaRoutes = require('../routes/ZonaRoutes')
const obligacionesContractualesRouter = require('../routes/obligacionesContractualesRoutes');
const regionalesRoutes = require('../routes/RegionalRoutes')
const centroFormacionRoutes = require('../routes/CentroFormacionRoutes')
const contratoRoutes = require('../routes/contratoEmpresaRoutes')
const obligacionesContratoRoutes = require("../routes/obligacionesContratoRoutes")
const puestosRoutes = require ('../routes/puestosVigilanciaRoutes')
const departamentoRoutes= require ('../routes/departamentoRoutes')
const PuestosVyERoutes = require('../routes/puestosXcentroV&ERoutes')
const vigilanciaElectronicaRoutes = require ('../routes/vigilanciaElectronicaRoutes')
const informesRoutes = require('../routes/informesRoutes');
const moduleRoutes= require('../routes/moduloRoutes')
const moduloXperfilRoutes= require('../routes/moduloxperfilRoutes')
const SolicitudesPuestosRoutes = require("../routes/solicitudesPuestosRoutes")
const PuestosTemporales =  require('../routes/puestosTemporalesRoutes')


const cronJobsC = require('../cronJobs/contratoEmpresaCron'); 
const cronJobsP = require('../cronJobs/PuestoTemporalCron')
const appSigoSet = express();
const port = 3000;
appSigoSet.use(cors());
cronJobsC;
appSigoSet.use(express.json());
appSigoSet.use('/uploads', express.static(path.join(__dirname, '../../uploads/firmas')));
appSigoSet.use('/uploadsPdf', express.static(path.join(__dirname, '../../uploads/Contratos')));


appSigoSet.use(regionalesRoutes);
appSigoSet.use(centroFormacionRoutes)
appSigoSet.use(usuarioRoutes);
appSigoSet.use(certificacionCentrofRoutes)
appSigoSet.use(perfilRoutes)
appSigoSet.use(zonaRoutes)
appSigoSet.use(obligacionesContratistaRoutes)
appSigoSet.use(municipioRoutes)
appSigoSet.use(sedeFormacionRoutes)
appSigoSet.use(morgan("dev"));
appSigoSet.use(regionalRoutes)
appSigoSet.use(empresaRoutes)
appSigoSet.use(obligacionesContractualesRouter)
appSigoSet.use(detalleContratoRoutes)
appSigoSet.use(perfilRoutes)
appSigoSet.use(contratoRoutes)
appSigoSet.use(puestosRoutes)
appSigoSet.use(obligacionesContratoRoutes)
appSigoSet.use(departamentoRoutes)
appSigoSet.use(PuestosVyERoutes)
appSigoSet.use(vigilanciaElectronicaRoutes)
appSigoSet.use(informesRoutes)
appSigoSet.use(moduleRoutes)
appSigoSet.use(moduloXperfilRoutes)
appSigoSet.use(SolicitudesPuestosRoutes)
appSigoSet.use(PuestosTemporales)

appSigoSet.set("port", process.env.PORT || port);


module.exports = appSigoSet;