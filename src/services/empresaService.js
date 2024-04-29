const {Empresa     ,
    findByEmpresa,
    deleteByEmpresa,
  findNit} = require('../models/empresaModel');
 const pool = require('../config/database');
 
 
 
 
 async function crearEmpresa(empresaData) {
   try {
       if (!empresaData  || !empresaData.nombre_empresav 
       || !empresaData.nit_empresa
        || !empresaData.direccion_empresav 
        || !empresaData.telefono_empresav 
        || !empresaData.email_empresav
        || !empresaData. representante_legal 
        || !empresaData.telefono_representantel
        || !empresaData.email_representantel 
        || !empresaData. persona_contacto 
        || !empresaData.telefono_personac 
        || !empresaData.email_personac ) {
           throw new Error('Faltan datos de la empresa');
       }
 

       const nuevaEmpresa = await Empresa.create(empresaData);
       return nuevaEmpresa;
   } catch (error) {
       throw error;
   }
 }
 
 const obtenerEmpresas = async () => {
   try {
     const empresas = await Empresa.findAll();
     return empresas;
   } catch (error) {
     throw error;
   }
 };
 
 


 
 async function editarEmpresa(idempresa_vigilancia, nuevaEmpresaData) {
   try {
     const empresaExistente = await findByEmpresa(idempresa_vigilancia);
     if (!empresaExistente) {
       throw new Error('la empresa no existe');
     }
 
     const empresaActualizada = { ...empresaExistente, ...nuevaEmpresaData };
 
     // Realizar la actualización en la base de datos
     const [result] = await pool.execute(
        'UPDATE empresa SET nombre_empresav=?, nit_empresa=?, direccion_empresav=?, telefono_empresav=?, email_empresav=?, representante_legal=?, telefono_representantel=?, email_representantel=?, persona_contacto=?, telefono_personac=?, email_personac=? WHERE idempresa_vigilancia=?',
        [
          empresaActualizada.nombre_empresav,
          empresaActualizada.nit_empresa,
          empresaActualizada.direccion_empresav,
          empresaActualizada.telefono_empresav,
          empresaActualizada.email_empresav,
          empresaActualizada.representante_legal,
          empresaActualizada.telefono_representantel,
          empresaActualizada.email_representantel,
          empresaActualizada.persona_contacto,
          empresaActualizada.telefono_personac,
          empresaActualizada.email_personac,
          idempresa_vigilancia
        ]
      );
      
 
     // Verificar si la actualización fue exitosa
     if (result.affectedRows === 0) {
       throw new Error('No se pudo actualizar la empresa');
     }
 
     return empresaActualizada;
   } catch (error) {
     throw error;
   }
 }
 
 async function eliminarEmpresa(idempresa_vigilancia) {
   try {
     await deleteByEmpresa(idempresa_vigilancia);
     return { message: 'empresa eliminada exitosamente' };
   } catch (error) {
     throw error;
   }
 }
 

 

 
 
 
 
 module.exports = {
    crearEmpresa,
    obtenerEmpresas,
    editarEmpresa,
    eliminarEmpresa
 };
 
