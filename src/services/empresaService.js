const {Empresa     ,
    findByEmpresa,
    deleteByEmpresa,
  findNit} = require('../models/empresaModel');
 const pool = require('../config/database');
 
 
 
 
 async function crearEmpresa(empresaData) {
   try {
       if (!empresaData  || !empresaData.nombre_empresav
       || !empresaData.nit_empresa
        || !empresaData.direccion_empresa
        || !empresaData.telefono_empresa 
        || !empresaData.email_empresa
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
 
 


 
 async function editarEmpresa(idempresa, nuevaEmpresaData) {
   try {
     const empresaExistente = await findByEmpresa(idempresa);
     if (!empresaExistente) {
       throw new Error('la empresa no existe');
     }
 
     const empresaActualizada = { ...empresaExistente, ...nuevaEmpresaData };
 
     // Realizar la actualización en la base de datos
     const [result] = await pool.execute(
        'UPDATE empresa SET nombre_empresa=?, nit_empresa=?, direccion_empresa=?, telefono_empresa=?, email_empresa=?, representante_legal=?, telefono_representantel=?, email_representantel=?, persona_contacto=?, telefono_personac=?, email_personac=? WHERE idempresa_vigilancia=?',
        [
          empresaActualizada.nombre_empresa,
          empresaActualizada.nit_empresa,
          empresaActualizada.direccion_empresa,
          empresaActualizada.telefono_empresa,
          empresaActualizada.email_empresa,
          empresaActualizada.representante_legal,
          empresaActualizada.telefono_representantel,
          empresaActualizada.email_representantel,
          empresaActualizada.persona_contacto,
          empresaActualizada.telefono_personac,
          empresaActualizada.email_personac,
          idempresa
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
 
 async function eliminarEmpresa(idempresa) {
   try {
     await deleteByEmpresa(idempresa);
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
 
