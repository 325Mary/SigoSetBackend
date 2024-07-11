const {Puestos, findByPuestosV,
  deleteByPuestosV,
  findByPuestosE,
  deleteByPuestosE,
  createPuestosVExCentro}= require ('../models/puestosXcentroV&E')
  const pool = require('../config/database');


const obtenerPuestosVigilancia = async () => {
    try {
      const puestVigilancia = await Puestos.findAll();
      return puestVigilancia;
    } catch (error) {
      throw error;
    }
  };

const obtenerPuestosXcentro= async(idcentro_formacion) => {
  try{
    const PuestoXcentro= await  Puestos.findAllPuestosXcentro(idcentro_formacion);
    return PuestoXcentro
  } catch(error) {
    throw error
  }
}

const obtenerPuestosEXcentro= async(idcentro_formacion) => {
  try{
    const PuestoEXcentro= await  Puestos.findAllPuestosElectronicosXcentro(idcentro_formacion);
    return PuestoEXcentro
  } catch(error) {
    throw error
  }
}
 


async function crearPuestosVxCentro(puestosvigilanciaXcentroData) {
  try {
      if (!puestosvigilanciaXcentroData  || !puestosvigilanciaXcentroData.idcentro_formacion || !puestosvigilanciaXcentroData.idempresa  || !puestosvigilanciaXcentroData.idpuesto_vigilancia || !puestosvigilanciaXcentroData.cantidad_puestov || !puestosvigilanciaXcentroData.idsede_formacion) {
          throw new Error('Faltan datos del  puesto de vigilancia por centro');
      }


      const nuevoPuestosVXcentro = await Puestos.createPuestosVxCentro(puestosvigilanciaXcentroData);
      return nuevoPuestosVXcentro;
  } catch (error) {
      throw error;
  }
}

async function crearPuestosVExCentro(puntosvelectronicaData) {
  try {
      if (!puntosvelectronicaData  || !puntosvelectronicaData.idcentro_formacion || !puntosvelectronicaData.idempresa  || !puntosvelectronicaData.idvigilancia_electronica || !puntosvelectronicaData.cantidad || !puntosvelectronicaData.idsede_formacion) {
          throw new Error('Faltan datos del  puesto de vigilancia por centro');
      }


      const nuevoPuestosVEXcentro = await createPuestosVExCentro(puntosvelectronicaData);
      return nuevoPuestosVEXcentro;
  } catch (error) {
      throw error;
  }
}

async function editarPuestoVXcentro(idpuestosvxcentrof, nuevoPuestoXcentroData) {
  try {
    const PuestoVXcentroExistente = await findByPuestosV(idpuestosvxcentrof);
    if (!PuestoVXcentroExistente) {
      throw new Error('El puesto por centro no existe');
    }

    const PuestoVXcentroActualizado = { ...PuestoVXcentroExistente, ...nuevoPuestoXcentroData };

    // Realizar la actualización en la base de datos
    const [result] = await pool.execute(
      'UPDATE puestosvxcentrof SET idcentro_formacion = ?, idempresa = ?, idpuesto_vigilancia = ?, cantidad_puestov = ?, status= ? WHERE idpuestosvxcentrof = ?',
      [
        PuestoVXcentroActualizado.idcentro_formacion,
        PuestoVXcentroActualizado.idempresa,
        PuestoVXcentroActualizado.idpuesto_vigilancia,
        PuestoVXcentroActualizado.cantidad_puestov,
        PuestoVXcentroActualizado.status,
        idpuestosvxcentrof
      ]
    );

    // Verificar si la actualización fue exitosa
    if (result.affectedRows === 0) {
      throw new Error('No se pudo actualizar el puesto por centro');
    }

    return PuestoVXcentroActualizado;
  } catch (error) {
    throw error;
  }
}


async function editarPuestoVEXcentro(idpuntosvelectronica, nuevoPuestoVEXcentroData) {
  try {
    const PuestoVEXcentroExistente = await findByPuestosE(idpuntosvelectronica);
    if (!PuestoVEXcentroExistente) {
      throw new Error('el puesto por centro  no existe');
    }

    const PuestoVEXcentroActualizado = { ...PuestoVEXcentroExistente, ...nuevoPuestoVEXcentroData };

    // Realizar la actualización en la base de datos
    const [result] = await pool.execute(
      'UPDATE puntosvelectronica SET  idcentro_formacion = ?, idempresa = ?, idvigilancia_electronica = ?, cantidad= ?, statusE = ? WHERE idpuntosvelectronica = ?',
      [
        PuestoVEXcentroActualizado.idcentro_formacion,
        PuestoVEXcentroActualizado.idempresa,
        PuestoVEXcentroActualizado.idvigilancia_electronica,
        PuestoVEXcentroActualizado.cantidad,
        PuestoVEXcentroActualizado.statusE,
        idpuntosvelectronica
      ]
    );

    // Verificar si la actualización fue exitosa
    if (result.affectedRows === 0) {
      throw new Error('No se pudo actualizar el puesto por centro ');
    }

    return PuestoVEXcentroActualizado;
  } catch (error) {
    throw error;
  }
}

async function eliminarPuestoVXcentro(idpuestosvxcentrof) {
  try {
    await deleteByPuestosV(idpuestosvxcentrof);
    return { message: ' eliminado exitosamente' };
  } catch (error) {
    throw error;
  }
}

async function eliminarPuestoVEXcentro(idpuntosvelectronica) {
  try {
    await deleteByPuestosE(idpuntosvelectronica);
    return { message: ' eliminado exitosamente' };
  } catch (error) {
    throw error;
  }
}

module.exports = {obtenerPuestosVigilancia, 
  obtenerPuestosXcentro, 
  obtenerPuestosEXcentro ,
  crearPuestosVxCentro,
  crearPuestosVExCentro,
  editarPuestoVXcentro,
  editarPuestoVEXcentro, 
  eliminarPuestoVXcentro,
  eliminarPuestoVEXcentro
}