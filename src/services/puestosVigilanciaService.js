const {
  Puestos,
  findPuesto,
  deleteByPuesto,
} = require("../models/puestosVigilanciaModel");
const pool = require("../config/database");
const { Empresa } = require("../models/empresaModel");
const { default: Decimal } = require("decimal.js");

async function crearPuesto(puestoData) {
  try {
    if (
      !puestoData ||
      !puestoData.descripcion_puesto ||
      !puestoData.tarifa_puesto) {
      throw new Error("Faltan campos del Puesto");
    }

  const ays= new Decimal(puestoData.tarifa_puesto).times(0.08);
  const iva =new Decimal (puestoData.tarifa_puesto).plus(ays).times(0.019);
  const total = new Decimal(puestoData.tarifa_puesto).plus(ays).plus(iva)

  puestoData.ays = parseFloat(ays.toFixed(2));
  puestoData.iva = parseFloat(iva.toFixed(2));
  puestoData.total = parseFloat(total.toFixed(2))
  
    const nuevoPuesto = await Puestos.create(puestoData);
    return nuevoPuesto;
  } catch (error) {
    throw error;
  }
}

const obtenerPuestos = async () => {
  try {
    const puestos = await Puestos.findAll();
    return puestos
  } catch (error) {
   throw error
  }
};

// const obtenerPuestoPorId = async (req, res, next) => {
//   const id = parseInt(req.params.id);
//   if (isNaN(id)) {
//     return res.status(400).json({ message: "ID inválido" });
//   }

//   try {
//     const puesto = await PuestoVigilanciaService.obtenerPuestoPorId(id);
//     if (!puesto) {
//       return res.status(404).json({ message: "Puesto no encontrado" });
//     }
//     res
//       .status(200)
//       .json({ message: "Puesto obtenido correctamente", data: puesto });
//   } catch (error) {
//     next(error);
//   }
// };





async function editarPuesto(idpuesto_vigilancia, nuevoPuestoData) {
  try {
      const VigilanciaHExistente = await findPuesto(idpuesto_vigilancia);
      if (!VigilanciaHExistente) {
          throw new Error('El item no existe');
      }

      // Validar que solo se reciban los campos descripcion, tarifa y ays
      const camposValidos = ['descripcion_puesto', 'tarifa_puesto', 'ays', 'iva' ,'total'];
      const camposRecibidos = Object.keys(nuevoPuestoData);
      const camposInvalidos = camposRecibidos.filter(field => !camposValidos.includes(field));

      if (camposInvalidos.length > 0) {
          throw new Error('El cuerpo de la solicitud contiene campos no válidos');
      }

       // Actualizar la entrada con los nuevos datos
       const VigilanciaHActualizada = { ...VigilanciaHExistente, ...nuevoPuestoData };
  
       // Si la tarifa ha sido modificada, recalcular ays, iva y total
       if (nuevoPuestoData.tarifa_puesto !== undefined && nuevoPuestoData.tarifa_puesto !== VigilanciaHExistente.tarifa_puesto) {
         const nuevaTarifa = nuevoPuestoData.tarifa_puesto;
   
         // Calcular ays, iva y total basados en la nueva tarifa
         const ays = new Decimal(nuevaTarifa).times(0.08);
         const iva = new Decimal(nuevaTarifa).plus(ays).times(0.019);
         const total = new Decimal(nuevaTarifa).plus(ays).plus(iva);
   
         // Actualizar los valores en el objeto actualizado
         VigilanciaHActualizada.ays = parseFloat(ays.toFixed(2));
         VigilanciaHActualizada.iva = parseFloat(iva.toFixed(2));
         VigilanciaHActualizada.total = parseFloat(total.toFixed(2));
       }
   
       // Realizar la actualización en la base de datos
       const [result] = await pool.execute(
         'UPDATE puestos_vigilancia SET descripcion_puesto= ?, tarifa_puesto= ?, ays= ?, iva= ?, total= ? WHERE idpuesto_vigilancia = ?',
         [
          VigilanciaHActualizada.descripcion_puesto,
          VigilanciaHActualizada.tarifa_puesto,
          VigilanciaHActualizada.ays,
           VigilanciaHActualizada.iva,
           VigilanciaHActualizada.total,
           idpuesto_vigilancia
         ]
       );
   
       // Verificar si la actualización fue exitosa
       if (result.affectedRows === 0) {
         throw new Error('No se pudo actualizar');
       }
   
       return VigilanciaHActualizada;
     } catch (error) {
       throw error;
     }
   }
 

async function eliminarPuesto(idpuesto_vigilancia){
 try {
    await deleteByPuesto(idpuesto_vigilancia);
    return { message: 'Puesto eliminado'}
 } catch (error) {
    throw error
 }
};

module.exports = {
  obtenerPuestos,
  crearPuesto,
  editarPuesto,
  eliminarPuesto,
};
