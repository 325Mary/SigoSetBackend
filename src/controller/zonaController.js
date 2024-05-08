const pool = require('../config/database');
const { ResponseStructure } = require('../helpers/ResponseStructure');
exports.getZonas = async (req, res) => {
    try {
        const [zonas] =  await pool.query(
            "SELECT * FROM zona"
        );
        res.status(200).json({ ...ResponseStructure, message: 'Zonas listados correctamente', data: zonas });
    

    } catch  (error){
        return res.status(500).json({message: "Error interno del servidor. Inténtalo de nuevo más tarde."})
    }

}

exports.getZona = async (req, res) => {
    try {
        const [zona] =  await pool.query(
            "SELECT * FROM zona WHERE idzona = ?", [
                req.params.idZona
        ]);
        if (zona.length === 0){
            return res.status(404).json({message: "Zona no encontrada."})
        }
        
        res.status(200).json({ ...ResponseStructure, message: 'Zonas correctamente', data: zona[0] });

    } catch  (error){
        return  res.status(500).json({message: "Error interno del servidor. Inténtalo de nuevo más tarde."})
    }
            
}
                    
exports.crearZona = async (req, res) => {
    console.log('crear zona', req.zona)
    try {
        const { Nombre_zona} = req.body
        const zona = await pool.query(
            "INSERT INTO zona (Nombre_zona) VALUES (?)",
            [Nombre_zona]
        );
        console.log('zona:',zona)
        res.status(201).json({ message: "Zona creada exitoxamente", result: zona})
    } catch  ( error ){
        console.log('error', error)
        return  res.status(500).json({message: "Error interno del servidor. Inténtalo de nuevo más tarde."})
    }
}

exports.editarZona= async ( req, res) => {
    try {
        const zona = await pool.query(
            "UPDATE zona SET ? WHERE idZona = ? ",
            [
                req.body,
                req.params.idZona
        ]);
        return res.status(200).json({message: "La zona se actualizo exitoxamente"})
    } catch ( error ){
        console.log(error)
        return  res.status(500).json({message: "Error interno del servidor. Inténtalo de nuevo más tarde."})
    }
}

exports.eliminarZona = async (req, res) =>  {
    try {
     
        const  [ zona ] = await pool.query(
            "DELETE FROM zona WHERE idZona = ?",[
               req.params.idZona
            ]
        )
        if ( zona.affectedRows === 0){
            return res.status(404).json({message: "Zona no encontrada."})
        }
        return res.status(204).json({message: "La zona se elimino exitoxamente"})
    } catch ( error ){
        return  res.status(500).json({message: "Error interno del servidor. Inténtalo de nuevo más tarde."})
    }
}