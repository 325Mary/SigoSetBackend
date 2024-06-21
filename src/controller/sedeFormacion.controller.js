
const pool = require('../config/database');

exports.getSedesFormacion = async (req, res) => {
    try {
        const [sedesFormacion] =  await pool.query(
            "SELECT * FROM sede_formacion"
        );
        res.status(200).json(sedesFormacion)

    } catch  (error){
        return res.status(500).json({message: "Error. Inténtalo de nuevo más tarde."})
    }

}

exports.getSedeFormacion= async (req, res) => {
    try {
        const [sedeFormacion] =  await pool.query(
            "SELECT * FROM sede_formacion WHERE idsede_formacion = ?", [
                req.params.idsede_formacion
        ]);
        if (sedeFormacion.length === 0){
            return res.status(404).json({message: "La sede de formación no encontrada."})
        }
        return res.status(200).json({result:sedeFormacion[0]})

    } catch  (error){
        return  res.status(500).json({message: "Error. Inténtalo de nuevo más tarde."})
    }

}

exports.crearSedeFormacion = async (req, res) => {
    try {
        const {  idmunicipio, sede_formacion,
            dir_sede_formacion, telefono_sedef, email_sedef
        } = req.body
        const sedeFormacion = await pool.query(
            "INSERT INTO sede_formacion ( idmunicipio, sede_formacion, dir_sede_formacion, telefono_sedef, email_sedef ) VALUES ( ?, ?, ?, ?, ?)",
            [ idmunicipio, sede_formacion,
                dir_sede_formacion, telefono_sedef, email_sedef]
        );
       
        res.status(201).json({ message: "Sede de formación creada exitoxamente", result: sedeFormacion})
    } catch  ( error ){
        console.log('error', error)
        return  res.status(500).json({message: "Error interno del servidor. Inténtalo de nuevo más tarde."})
    }
}

exports.editarSedeFormacion= async ( req, res) => {
    try {
        const sedeFormacion = await pool.query(
            "UPDATE sede_formacion SET ? WHERE idsede_formacion = ? ",
            [
                req.body,
                req.params.idsede_formacion
        ]);

        return res.status(200).json({message: "La sede de formación se actualizo exitoxamente"})
    } catch ( error ){
        console.log(error)
        return  res.status(500).json({message: "Error. Inténtalo de nuevo más tarde."})
    }
}

exports.eliminarSedeFormacion= async (req, res) =>  {
    try {
     
        const  [ sedeFormacion ] = await pool.query(
            "DELETE FROM sede_formacion WHERE idsede_formacion = ?",[
               req.params.idsede_formacion
            ]
        )
        if ( sedeFormacion.affectedRows === 0){
            return res.status(404).json({message: "Sede de formación no encontrada."})
        }
        return res.status(204).json({message: "La sede de formación se elimino exitoxamente"})
    } catch ( error ){
        return  res.status(500).json({message: "Error. Inténtalo de nuevo más tarde."})
    }
}

exports.getSedesPorCentroFormacion = async (req, res) => {
    try {
        const { idcentro_formacion } = req.params;
        const [sedesFormacion] = await pool.query(
            "SELECT * FROM sede_formacion WHERE idcentro_formacion = ?",
            [idcentro_formacion]
        );
        res.status(200).json(sedesFormacion);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error. Inténtalo de nuevo más tarde." });
    }
}
