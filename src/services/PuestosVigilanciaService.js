const {PuestosVigilancia}= require ('../models/puestosVigilanciaModel')

const obtenerDepartamentos = async () => {
    try {
      const PuestosVigilancia = await PuestosVigilancia.findAll();
      return PuestosVigilancia;
    } catch (error) {
      throw error;
    }
  };
 
module.exports = PuestosVigilancia