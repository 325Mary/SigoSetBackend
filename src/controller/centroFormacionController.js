//centro de formacion
const pool = require('../config/database');
const { ResponseStructure } = require('../helpers/ResponseStructure');
exports.getCentrosFormacion = async (req, res) => {
    try {
        const [CentrosDeformacion] =  await pool.query(
            "SELECT * FROM centro_formacion"
        );
    
        res.status(200).json({ ...ResponseStructure, message: 'Centros de formacion listados correctamente', data: CentrosDeformacion });
    } catch  (error){
        return res.status(500).json({message: "Error interno del servidor. Inténtalo de nuevo más tarde."})
    }

}

exports.getCentroFormacion = async (req, res) => {
    console.log(req.params.idCentroFormacion)
    try {
        const [CentroDeformacion] = await pool.query(
            `SELECT Centro_formacion.*, Regional.regional AS regional 
             FROM Centro_formacion 
             JOIN Regional ON Centro_formacion.idRegional = Regional.idRegional 
             WHERE Centro_formacion.idcentro_formacion = ?`, 
            [req.params.idCentroFormacion]
        );
        
        console.log(CentroDeformacion[0])
        if (CentroDeformacion.length === 0) {
            return res.status(404).json({message: "Centro de formación no encontrado."})
        }

        res.status(200).json({ 
            ...ResponseStructure, 
            status: "success", 
            message: 'Centro de formación encontrado correctamente', 
            data: CentroDeformacion[0] 
        });
    } catch (error) {
        return res.status(500).json({message: "Error interno del servidor. Inténtalo de nuevo más tarde."})
    }
}


exports.crearCentroFormacion = async (req, res) => {
    
    try {
        const { idRegional, idzona, centro_formacion , dir_centro_formacion, telefono_centrof, 
                email_centrof
                } = req.body
                
       
        const CentroDeformacion = await pool.query(
            "INSERT INTO centro_formacion (idRegional, idzona, centro_formacion, dir_centro_formacion, telefono_centrof, email_centrof ) VALUES (?, ?, ?, ?, ?, ?)",
            [idRegional, idzona, centro_formacion, dir_centro_formacion, telefono_centrof, email_centrof]
        );
        
        res.status(200).json({ ...ResponseStructure,status:"success", message: 'Centro de  formacion creado exitoxamente', data: CentroDeformacion });
    } catch  ( error ){
        console.log('error', error)
        return  res.status(500).json({message: "Error interno del servidor. Inténtalo de nuevo más tarde."})
    }
}

exports.editarCentroFormacion = async ( req, res) => {
    try {
        const CentroDeformacion = await pool.query(
            "UPDATE Centro_formacion SET ? WHERE idcentro_formacion = ? ",
            [
                req.body,
                req.params.idCentroFormacion
        ]);
        console.log(CentroDeformacion)
        res.status(200).json({ ...ResponseStructure,status:"success", message: 'Centro de  formación se actualizo exitoxamente', data: CentroDeformacion });
    } catch ( error ){
        console.log(error)
        return  res.status(500).json({message: "Error interno del servidor. Inténtalo de nuevo más tarde."})
    }
}

exports.eliminarCentroFormacion = async (req, res) =>  {
    try {
        console.log('eliminar', req.params.idCentroFormacion )
        const  [ CentroDeformacion ] = await pool.query(
            "DELETE FROM Centro_formacion WHERE idcentro_formacion = ?",[
               req.params.idCentroFormacion 
            ]
        )
        if ( CentroDeformacion.affectedRows === 0){
            return res.status(404).json({message: "Centro de formación no encontrado."})
        }
        
        res.status(200).json({ ...ResponseStructure,status:"success", message: 'Centro de  formación se elimino exitoxamente'});
    } catch ( error ){
        return  res.status(500).json({message: "Error interno del servidor. Inténtalo de nuevo más tarde."})

    }
}
