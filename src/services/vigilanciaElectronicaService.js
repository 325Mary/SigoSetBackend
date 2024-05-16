const { vigilanciaElectronica,
    findOneVigilanciaElectronica,
    findByVigilanciaElectronica,
    deleteByIdVigilanciaElectronica}= require ('../models/vigilanciaElectronicaModel')

    
 
    const { Decimal } = require('decimal.js');

    async function crearVigilanciaElectronica(VigilanciaElectronicaData) {
        try {
            if (!VigilanciaElectronicaData || !VigilanciaElectronicaData.descripcion || !VigilanciaElectronicaData.tarifa) {
                throw new Error('Faltan datos');
            }
    
            // Calcula el valor de ays multiplicando tarifa por 0.08
            const ays = new Decimal(VigilanciaElectronicaData.tarifa).times(0.08);
    
            // Calcula el valor del IVA sumando tarifa y ays, y luego multiplicando por 0.019
            const iva = new Decimal(VigilanciaElectronicaData.tarifa).plus(ays).times(0.019);
    
            // Calcula el valor total sumando tarifa, ays e iva
            const total = new Decimal(VigilanciaElectronicaData.tarifa).plus(ays).plus(iva);
    
            // Añade los valores calculados a los datos antes de crear la vigilancia electrónica
            VigilanciaElectronicaData.ays = ays.toNumber();
            VigilanciaElectronicaData.iva = iva.toNumber();
            VigilanciaElectronicaData.total = total.toNumber();
    
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
      const VigilanciaElectronicaExistente = await findByMunicipio(idvigilancia_electronica);
      if (!municipioExistente) {
        throw new Error('El municipio no existe');
      }
  
      const VigilanciaElectronicaActualizada = { ...municipioExistente, ...nuevoMunicioData };
  
      // Realizar la actualización en la base de datos
      const [result] = await pool.execute(
        'UPDATE vigilancia_electronica SET descripcion= ?, tarifa= ?, ays= ?, iva= ?, total= ? WHERE idvigilancia_electronica = ?',
        [
            VigilanciaElectronicaActualizada.descripcion,
            VigilanciaElectronicaActualizada.tarifa,
            VigilanciaElectronicaActualizada.ays,
            VigilanciaElectronicaActualizada.iva,
            VigilanciaElectronicaActualizada.total,
          idvigilancia_electronica
        ]
      );
  
      // Verificar si la actualización fue exitosa
      if (result.affectedRows === 0) {
        throw new Error('No se pudo actualizar ');
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
  