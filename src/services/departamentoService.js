const {Departamento     ,
    findOneDepartamento,
    findByDepartamento,
    deleteByIdDepartamento} = require('../models/departamentosModel');
 const pool = require('../config/database');

 async function crearDepartamento(departamentoData) {
   try {
       if (!departamentoData.departamento ) {
           throw new Error('Faltan datos del departamento');
       }

       const nuevoDepartamento = await Departamento.create(departamentoData);
       return nuevoDepartamento;
   } catch (error) {
       throw error;
   }
 }

 const obtenerDepartamentoPorId = async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    const departamento = await findOneDepartamento(id);
    if (!departamento) {
      return res.status(404).json({ message: 'Departamento no encontrado' });
    }
    return res.status(200).json('Departamento encontrado ',departamento);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el departamento', error: error.message });
  }
};

 const obtenerDepartamentos = async () => {
   try {
     const departamentos = await Departamento.findAll();
     return departamentos;
   } catch (error) {
     throw error;
   }
 };
 
 


 
 async function editarDepartamento(iddepartamento, nuevoDepartamentoData) {
   try {
     const DepartamentoExistente = await findByDepartamento(iddepartamento);
     if (!DepartamentoExistente) {
       throw new Error('El Departamento no existe');
     }
 
     const departamentoActualizado = { ...DepartamentoExistente, ...nuevoDepartamentoData };
 
     // Realizar la actualización en la base de datos
     const [result] = await pool.execute(
       'UPDATE departamento SET  departamento = ?  WHERE iddepartamento = ?',
       [
        departamentoActualizado.iddepartamento,
        iddepartamento
       ]
     );
 
     // Verificar si la actualización fue exitosa
     if (result.affectedRows === 0) {
       throw new Error('No se pudo actualizar el Departamento');
     }
 
     return departamentoActualizado;
   } catch (error) {
     throw error;
   }
 }
 
 async function eliminarDepartamento(iddepartamento) {
   try {
     await deleteByIdDepartamento(iddepartamento);
     return { message: 'Departamento eliminado exitosamente' };
   } catch (error) {
     throw error;
   }
 }
 

 

 
 
 
 
 module.exports = {
    crearDepartamento,
    obtenerDepartamentos,
    editarDepartamento,
    eliminarDepartamento,
    obtenerDepartamentoPorId
 };
 