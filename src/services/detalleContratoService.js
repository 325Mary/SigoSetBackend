const {detalleContrato     ,
  findByDetalle_contrato,
  deleteByiDetalle_contrato,
  findByDetalle_contratoxNombre} = require('../models/detalleContratoModel');
const pool = require('../config/database');


const crearDetalleContrato = async (detalle_contratoData) => {
  try {
    const nuevoDetalleContrato = await detalleContrato.create(detalle_contratoData);
    return nuevoDetalleContrato;
  } catch (error) {
    throw error;
  }
};



const obtenerDetallesdeContrato = async () => {
 try {
   const detalleContratos = await detalleContrato.findAll();
   return detalleContratos;
 } catch (error) {
   throw error;
 }
};





async function editarDetalleContrato(iddetalle_contrato, nuevoDetalleContratoData) {
  try {
    const detalleContratoExistente = await findByDetalle_contrato(iddetalle_contrato);
    if (!detalleContratoExistente) {
      throw new Error('El detalle contrato no existe');
    }

    const detalleContratoActualizado = { ...detalleContratoExistente, ...nuevoDetalleContratoData };

    const sql = `
      UPDATE detalle_contrato SET
        idcertificacion_centrof = ?,
        idobligaciones_contrato = ?,
        cumple = ?,
        nombreDetalleContrato = ?,
        descripcionVHumana = ?,
        cantidad_puestov = ?,
        direccionSedeVHumana = ?,
        total = ?,
        descripcion = ?,
        cantidad = ?,
        direccionSedeVElectronica = ?,
        totalE = ?,
        observaciones1 = ?,
        observaciones2 = ?,
        fechaCreacion = ?
      WHERE iddetalle_contrato = ?`;

    const [result] = await pool.execute(sql, [
      detalleContratoActualizado.idcertificacion_centrof,
      detalleContratoActualizado.idobligaciones_contrato,
      detalleContratoActualizado.cumple,
      detalleContratoActualizado.nombreDetalleContrato,
      detalleContratoActualizado.descripcionVHumana,
      detalleContratoActualizado.cantidad_puestov,
      detalleContratoActualizado.direccionSedeVHumana,
      detalleContratoActualizado.total,
      detalleContratoActualizado.descripcion,
      detalleContratoActualizado.cantidad,
      detalleContratoActualizado.direccionSedeVElectronica,
      detalleContratoActualizado.totalE,
      detalleContratoActualizado.observaciones1,
      detalleContratoActualizado.observaciones2,
      detalleContratoActualizado.fechaCreacion,
      iddetalle_contrato
    ]);

    if (result.affectedRows === 0) {
      throw new Error('No se pudo actualizar el detalle de contrato');
    }

    return detalleContratoActualizado;
  } catch (error) {
    console.error('Error actualizando detalle_contrato:', error);
    throw error;
  }
}


async function eliminarDetalleContrato(iddetalle_contrato) {
 try {
   await deleteByiDetalle_contrato(iddetalle_contrato);
   return { message: 'detalle de contrato eliminado exitosamente' };
 } catch (error) {
   throw error;
 }
}
async function obtenerDetalleContratoPorId(iddetalle_contrato){
  try {
    // Llamar al modelo para buscar el detalle de contrato por ID
    const detalleContrato = await findByDetalle_contrato(iddetalle_contrato);
    return detalleContrato;
  } catch (error) {
    throw error; // Propagar el error para ser manejado por el controlador
  }
}



async function obtenerDetalleContratoPorNombre(nombreDetalleContrato){
  try {
    // Llamar al modelo para buscar el detalle de contrato por ID
    const detalleContratoNombre = await findByDetalle_contratoxNombre(nombreDetalleContrato);
    return detalleContratoNombre;
  } catch (error) {
    throw error; // Propagar el error para ser manejado por el controlador
  }
}






module.exports = {
  crearDetalleContrato,
  obtenerDetallesdeContrato,
  editarDetalleContrato,
  eliminarDetalleContrato,
  obtenerDetalleContratoPorId,
  obtenerDetalleContratoPorNombre
};

