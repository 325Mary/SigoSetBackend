const {
    PuestosTemporales,
    findByPkPuestosTemporales,
    deleteByIdPuestosTemporales,
}= require ('../models/PuestosTemporalesModel.js')

const mysql = require('mysql2');
const pool = require('../config/database.js')


async function crearPuestosTemporales(PuestosTemporalesData) {
    try{
        // if (!PuestosTemporalesData.idcentro_formacion || !PuestosTemporalesData.idempresa || !PuestosTemporalesData.idsede_formacion
        //     || !PuestosTemporalesData.idpuntosvelectronica || !PuestosTemporalesData.idpuestosvxcentrof || !PuestosTemporalesData.tipo_Puesto || !PuestosTemporalesData.cantidad || !PuestosTemporalesData.estado
        // ){
        //     throw new   Error('Faltan datos')
        // }

        const NuevoPuestoTemporal = await PuestosTemporales.create(PuestosTemporalesData)
        return NuevoPuestoTemporal
    } catch(error){
        throw error
    }
}

async function ObtenerPuestosTemprales(idcentro_formacion) {
    try {
        const TodosPuestosTemporales = await PuestosTemporales.findAll(idcentro_formacion);
        if (TodosPuestosTemporales.length === 0) {
            throw new Error('No se encontraron puestos temporales para el id del centro de formación proporcionado.');
        }

        return TodosPuestosTemporales;
    } catch (error) {
        throw new Error(`Error al obtener los puestos temporales: ${error.message}`);
    }
}

async function editarPuestoTemporal(idPuestosTemporales, NuevoPuestoTemporalData){
    try{
        const puestoTemporalExistente = await findByPkPuestosTemporales(idPuestosTemporales)
        if (!puestoTemporalExistente){
            throw new  Error ('no existe el id:',{idPuestosTemporales});
        }
        const PuestosTemporalesActualizado = { ...puestoTemporalExistente, ...NuevoPuestoTemporalData}
    
        const [result] = await pool.execute(
            'UPDATE puestos_temporales SET idcentro_formacion = ?, idempresa =?, idsede_formacion = ?, idpuntosvelectronica = ?, idpuestosvxcentrof = ?, tipo_Puesto = ?, cantidad = ?, estado = ? WHERE idPuestosTemporales  ',
            [
                PuestosTemporalesActualizado.idcentro_formacion,
                PuestosTemporalesActualizado.idempresa,
                PuestosTemporalesActualizado.idsede_formacion,
                PuestosTemporalesActualizado.idpuestosvxcentrof,
                PuestosTemporalesActualizado.idpuntosvelectronica,
                PuestosTemporalesActualizado.tipo_Puesto,
                PuestosTemporalesActualizado.cantidad,
                PuestosTemporalesActualizado.estado,
                idPuestosTemporales
            ]
        )
        if (result.affectedRows === 0){
            throw new Error('no se pudo actualizar el id:', {idPuestosTemporales})
        }
        return PuestosTemporalesActualizado
    }catch(error){
        throw error
    }
}

async function eliminarPuestoTemporal(idPuestosTemporales){
    try{
        await deleteByIdPuestosTemporales(idPuestosTemporales)
        return { message: 'Puesto eliminado'}
    }catch(error){
        throw error
    }
}



module.exports = {
    crearPuestosTemporales,
    ObtenerPuestosTemprales,
    editarPuestoTemporal,
    eliminarPuestoTemporal
}