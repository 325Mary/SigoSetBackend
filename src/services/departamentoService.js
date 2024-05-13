const {Departamento     ,
    findOneDepartamento,
    findByDepartamento,
    deleteByIdDepartamento} = require('../models/departamentosModel');
 const pool = require('../config/database');

 async function crearDepartamento(departamentoData) {
   try {
       if (!departamentoData  || !departamentoData.iddepartamento  ) {
           throw new Error('Faltan datos del departamento');
       }
 

       const nuevoDepartamento = await Departamento.create(departamentoData);
       return nuevoDepartamento;
   } catch (error) {
       throw error;
   }
 }
 
 const obtenerDepartamentos = async () => {
   try {
     const departamentos = await Departamento.findAll();
     return departamentos;
   } catch (error) {
     throw error;
   }
 };
 
 


 
 async function editarDepartamento(idepartamento, nuevoDepartamentoData) {
   try {
     const DepartamentoExistente = await findByDepartamento(idepartamento);
     if (!DepartamentoExistente) {
       throw new Error('El Departamento no existe');
     }
 
     const departamentoActualizado = { ...DepartamentoExistente, ...nuevoDepartamentoData };
 
     // Realizar la actualización en la base de datos
     const [result] = await pool.execute(
       'UPDATE departamento SET  departamento = ?  WHERE idepartamento = ?',
       [
        DepartamentoActualizado.idepartamento,
         idepartamento
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
 
 async function eliminarDepartamento(idepartamento) {
   try {
     await deleteByIdDepartamento(idepartamento);
     return { message: 'Departamento eliminado exitosamente' };
   } catch (error) {
     throw error;
   }
 }
 

 

 
 
 
 
 module.exports = {
    crearDepartamento,
    obtenerDepartamentos,
    editarDepartamento,
    eliminarDepartamento
 };
 