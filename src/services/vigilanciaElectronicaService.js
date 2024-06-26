const { vigilanciaElectronica,
    findOneVigilanciaElectronica,
    findByVigilanciaElectronica,
    deleteByIdVigilanciaElectronica}= require ('../models/vigilanciaElectronicaModel')
    const pool = require('../config/database'); 
    
 
    const { Decimal } = require('decimal.js');

  //   async function crearVigilanciaElectronica(VigilanciaElectronicaData) {
  //     try {
  //         if (!VigilanciaElectronicaData || !VigilanciaElectronicaData.descripcion || !VigilanciaElectronicaData.tarifa) {
  //             throw new Error('Faltan datos');
  //         }
  
  //         // Calcula el valor de ays multiplicando tarifa por 0.08
  //         const ays = new Decimal(VigilanciaElectronicaData.tarifa).times(0.08);
  
  //         // Calcula el valor del IVA sumando tarifa y ays, y luego multiplicando por 0.019
  //         const iva = new Decimal(VigilanciaElectronicaData.tarifa).plus(ays).times(0.019);
  
  //         // Calcula el valor total sumando tarifa, ays e iva
  //         const total = new Decimal(VigilanciaElectronicaData.tarifa).plus(ays).plus(iva);
  
  //         // Redondea los valores a dos decimales
  //         VigilanciaElectronicaData.ays = parseFloat(ays.toFixed(2));
  //         VigilanciaElectronicaData.iva = parseFloat(iva.toFixed(2));
  //         VigilanciaElectronicaData.total = parseFloat(total.toFixed(2));
  
  //         const nuevaVigilanciaElectronica = await vigilanciaElectronica.create(VigilanciaElectronicaData);
  //         return nuevaVigilanciaElectronica;
  //     } catch (error) {
  //         throw error;
  //     }
  // }
  
    
  async function crearVigilanciaElectronica(VigilanciaElectronicaData) {
    try {
        if (!VigilanciaElectronicaData || !VigilanciaElectronicaData.descripcion || typeof VigilanciaElectronicaData.tarifa === 'undefined' || typeof VigilanciaElectronicaData.ays === 'undefined') {
            throw new Error('Faltan datos');
        }

        const totalE = new Decimal(VigilanciaElectronicaData.tarifa).plus(VigilanciaElectronicaData.ays).dividedBy(2);
        VigilanciaElectronicaData.totalE = parseFloat(totalE.toFixed(2));

        const nuevaVigilanciaElectronica = await vigilanciaElectronica.create(VigilanciaElectronicaData);
        return nuevaVigilanciaElectronica;
    } catch (error) {
        throw error;
    }
}
  
  const obtenerVigilanciaElectronicas = async () => {
    try {
      const VigilanciaElectronica = await vigilanciaElectronica.findAll();
      return VigilanciaElectronica;
    } catch (error) {
      throw error;
    }
  };
  
  
 
 
  
  async function editarVigilanciaElectronica(idvigilancia_electronica, nuevoVigilanciaElectronicaData) {
    try {
        const VigilanciaElectronicaExistente = await findByVigilanciaElectronica(idvigilancia_electronica);
        if (!VigilanciaElectronicaExistente) {
            throw new Error('El item no existe');
        }

        // Validar que solo se reciban los campos descripcion, tarifa y ays
        const camposValidos = ['descripcion', 'tarifa', 'ays', 'totalE'];
        const camposRecibidos = Object.keys(nuevoVigilanciaElectronicaData);
        const camposInvalidos = camposRecibidos.filter(field => !camposValidos.includes(field));

        if (camposInvalidos.length > 0) {
            throw new Error('El cuerpo de la solicitud contiene campos no válidos');
        
        }

        // Actualizar la entrada con los nuevos datos
        const VigilanciaElectronicaActualizada = { ...VigilanciaElectronicaExistente, ...nuevoVigilanciaElectronicaData };

        // Si la tarifa o ays ha sido modificada, recalcular total
        if (nuevoVigilanciaElectronicaData.tarifa !== undefined || nuevoVigilanciaElectronicaData.ays !== undefined) {
            const nuevaTarifa = nuevoVigilanciaElectronicaData.tarifa !== undefined ? nuevoVigilanciaElectronicaData.tarifa : VigilanciaElectronicaExistente.tarifa;
            const nuevoAys = nuevoVigilanciaElectronicaData.ays !== undefined ? nuevoVigilanciaElectronicaData.ays : VigilanciaElectronicaExistente.ays;

            const totalE = new Decimal(nuevaTarifa).plus(nuevoAys).dividedBy(2);
            VigilanciaElectronicaActualizada.totalE = parseFloat(totalE.toFixed(2));
        }

        // Realizar la actualización en la base de datos
        const [result] = await pool.execute(
            'UPDATE vigilancia_electronica SET descripcion= ?, tarifa= ?, ays= ?, total= ? WHERE idvigilancia_electronica = ?',
            [
                VigilanciaElectronicaActualizada.descripcion,
                VigilanciaElectronicaActualizada.tarifa,
                VigilanciaElectronicaActualizada.ays,
                VigilanciaElectronicaActualizada.totalE,
                idvigilancia_electronica
            ]
        );

        // Verificar si la actualización fue exitosa
        if (result.affectedRows === 0) {
            throw new Error('No se pudo actualizar');
        }

        return VigilanciaElectronicaActualizada;
    } catch (error) {
        throw error;
    }
}
  async function eliminarVigilanciaElectronica(idvigilancia_electronica) {
    try {
      await deleteByIdVigilanciaElectronica(idvigilancia_electronica);
      return { message: 'eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }
  
 
  
 
  
  
  
  
  module.exports = {
    crearVigilanciaElectronica,
    obtenerVigilanciaElectronicas,
    editarVigilanciaElectronica,
    eliminarVigilanciaElectronica
  };
  