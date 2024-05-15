const PuestoVigilancia = require('../models/puestosVigilanciaModel');

const obtenerPuestos = async() => {
    try {
        const puestos = await PuestoVigilancia.findAll();
        return puestos;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener puestos de vigilancia');
    }
};

const obtenerPuestoPorId = async(id) => {
    try {
        const puesto = await PuestoVigilancia.findById(id);
        if (!puesto) {
            throw new Error('Puesto de vigilancia no encontrado');
        }
        return puesto;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener puesto de vigilancia');
    }
};

// const crearPuesto = async(puestoData) => {
// const datos_obligatorios = puestoData || puestoData.descripcion_puesto || puestoData.tarifa_puesto || puestoData.ays

//     if  ( !datos_obligatorios) {
//         throw new Error('Faltan datos obligatorios para crear el puesto.'),datos_obligatorios;
//     }

//     const iva = puestoData.tarifa_puesto * 0.19;
//     const total = puestoData.tarifa_puesto + puestoData.ays + iva;

//     try {
//         const nuevoPuesto = await PuestoVigilancia.create(puestoData);
//         return nuevoPuesto;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Error al crear puesto de vigilancia');
//     }
// };

const crearPuesto = async (puestoData) => {
    const descripcionPuesto = puestoData.descripcion_puesto;
    const tarifaPuesto = puestoData.tarifa_puesto;
    const ays = puestoData.ays;

    if (!descripcionPuesto || !tarifaPuesto || !ays) {
        const camposFaltantes = [];
        if (!descripcionPuesto) camposFaltantes.push('descripcion_puesto');
        if (!tarifaPuesto) camposFaltantes.push('tarifa_puesto');
        if (!ays) camposFaltantes.push('ays');
        
        throw new Error(`Faltan datos obligatorios para crear el puesto: ${camposFaltantes.join(', ')}`);
    }

    const iva = tarifaPuesto * 0.19;
    const total = tarifaPuesto + ays + iva;

    try {
        const nuevoPuesto = await PuestoVigilancia.create(puestoData);
        return nuevoPuesto;
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear puesto de vigilancia');
    }
};

const editarPuesto = async(id, nuevoPuestoData) => {
    if (!nuevoPuestoData || !nuevoPuestoData.descripcion_puesto || !nuevoPuestoData.tarifa_puesto || !nuevoPuestoData.ays) {
        throw new Error('Faltan datos obligatorios para actualizar el puesto.');
    }

    const iva = nuevoPuestoData.tarifa_puesto * 0.19;
    const total = nuevoPuestoData.tarifa_puesto + nuevoPuestoData.ays + iva;

    try {
        const puestoEditado = await PuestoVigilancia.update(id, nuevoPuestoData);
        return puestoEditado;
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar puesto de vigilancia');
    }
};

const eliminarPuesto = async(id) => {
    try {
        await PuestoVigilancia.deleteById(id);
        return { message: 'Puesto de vigilancia eliminado con éxito' };
    } catch (error) {
        console.error(error);
        throw new Error('Error al eliminar puesto de vigilancia');
    }
};

module.exports = {
    obtenerPuestos,
    obtenerPuestoPorId,
    crearPuesto,
    editarPuesto,
    eliminarPuesto
};