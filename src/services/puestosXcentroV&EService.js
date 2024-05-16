const {Puestos, findByPuestosV,
  deleteByPuestosV,
  findByPuestosE,
  deleteByPuestosE}= require ('../models/puestosXcentroV&E')

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
      if (!puestosvigilanciaXcentroData  || !puestosvigilanciaXcentroData.idcentro_formacion || !puestosvigilanciaXcentroData.idempresa  || puestosvigilanciaXcentroData.idpuesto_vigilancia || puestosvigilanciaXcentroData.cantidad_puestov) {
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
      if (!puntosvelectronicaData  || !puntosvelectronicaData.idcentro_formacion || !puntosvelectronicaData.idempresa  || puntosvelectronicaData.idvigilancia_electronica || puntosvelectronicaData.cantidad_puestov) {
          throw new Error('Faltan datos del  puesto de vigilancia por centro');
      }


      const nuevoPuestosVEXcentro = await Puestos.createPuestosVxCentro(puntosvelectronicaData);
      return nuevoPuestosVEXcentro;
  } catch (error) {
      throw error;
  }
}

async function editarPuestoVXcentro(idpuestosvxcentrof, nuevoPuestoXcentroData) {
  try {
    const PuestoVXcentroExistente = await findByMunicipio(idpuestosvxcentrof);
    if (!PuestoVXcentroExistente) {
      throw new Error('el puesto por centro  no existe');
    }

    const PuestoVXcentroActualizado = { ...PuestoVXcentroExistente, ...nuevoPuestoXcentroData };

    // Realizar la actualización en la base de datos
    const [result] = await pool.execute(
      'UPDATE puestosvxcentrof SET  idcentro_formacionn= ?, idempresa = ?, idpuesto_vigilancia = ?, cantidad_puestov= ? WHERE idpuestosvxcentrof = ?',
      [
        PuestoVXcentroActualizado.idcentro_formacionn,
        PuestoVXcentroActualizado.idempresa,
        PuestoVXcentroActualizado.idpuesto_vigilancia,
        PuestoVXcentroActualizado.cantidad_puestov,
        idpuestosvxcentrof
      ]
    );

    // Verificar si la actualización fue exitosa
    if (result.affectedRows === 0) {
      throw new Error('No se pudo actualizar el puesto por centro ');
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
      'UPDATE puestosvxcentrof SET  idcentro_formacionn   = ?, idempresa = ?, idvigilancia_electronica = ?, cantidad_puestov= ? WHERE idpuntosvelectronica = ?',
      [
        PuestoVEXcentroActualizado.idcentro_formacionn,
        PuestoVEXcentroActualizado.idempresa,
        PuestoVEXcentroActualizado.idvigilancia_electronica,
        PuestoVXcenPuestoVEXcentroActualizadotroActualizado.cantidad_puestov,
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