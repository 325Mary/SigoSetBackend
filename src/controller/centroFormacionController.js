const pool = require('../config/database');
const { ResponseStructure } = require('../helpers/ResponseStructure');

// Listar todos los centros de formación
exports.getCentrosFormacion = async (req, res) => {
    try {
        const [CentrosDeformacion] = await pool.query("SELECT * FROM centro_formacion");
        res.status(200).json({ 
            ...ResponseStructure, 
            message: 'Centros de formación listados correctamente', 
            data: CentrosDeformacion 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error interno del servidor. Inténtalo de nuevo más tarde."});
    }
};

// Obtener un centro de formación específico
exports.getCentroFormacion = async (req, res) => {
    try {
        const [CentroDeformacion] = await pool.query(
            `SELECT centro_formacion.*, regional.regional AS regional 
             FROM centro_formacion 
             JOIN regional ON centro_formacion.idRegional = regional.idRegional 
             WHERE centro_formacion.idcentro_formacion = ?`, 
            [req.params.idcentroFormacion]
        );
        
        if (CentroDeformacion.length === 0) {
            return res.status(404).json({message: "Centro de formación no encontrado."});
        }

        res.status(200).json({ 
            ...ResponseStructure, 
            status: "success", 
            message: 'Centro de formación encontrado correctamente', 
            data: CentroDeformacion[0] 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error interno del servidor. Inténtalo de nuevo más tarde."});
    }
};

// Crear un nuevo centro de formación
exports.crearCentroFormacion = async (req, res) => {
    try {
        const { idRegional, idzona, centro_formacion, dir_centro_formacion, telefono_centrof, email_centrof, ordenador_gasto, telefono_ordenadorg, email_ordenadorg } = req.body;
        const [CentroDeformacion] = await pool.query(
            "INSERT INTO centro_formacion (idRegional, idzona, centro_formacion, dir_centro_formacion, telefono_centrof, email_centrof, ordenador_gasto, telefono_ordenadorg, email_ordenadorg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [idRegional, idzona, centro_formacion, dir_centro_formacion, telefono_centrof, email_centrof, ordenador_gasto, telefono_ordenadorg, email_ordenadorg]
        );
        
        res.status(200).json({ 
            ...ResponseStructure,  
            status: "success", 
            message: 'Centro de formación creado exitosamente', 
            data: CentroDeformacion 
        });
    } catch (error) {
        console.error('error', error);
        res.status(500).json({message: "Error interno del servidor. Inténtalo de nuevo más tarde."});
    }
};

// Editar un centro de formación existente
exports.editarCentroFormacion = async (req, res) => {
    try {
        const [CentroDeformacion] = await pool.query(
            "UPDATE centro_formacion SET ? WHERE idcentro_formacion = ?",
            [req.body, req.params.idcentroFormacion]
        );
        
        if (CentroDeformacion.affectedRows === 0) {
            return res.status(404).json({message: "Centro de formación no encontrado."});
        }

        res.status(200).json({ 
            ...ResponseStructure, 
            status: "success", 
            message: 'Centro de formación actualizado exitosamente', 
            data: CentroDeformacion 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error interno del servidor. Inténtalo de nuevo más tarde."});
    }
};

// Eliminar un centro de formación
exports.eliminarCentroFormacion = async (req, res) => {
    try {
        const [CentroDeformacion] = await pool.query(
            "DELETE FROM centro_formacion WHERE idcentro_formacion = ?",
            [req.params.idcentroFormacion]
        );
        
        if (CentroDeformacion.affectedRows === 0) {
            return res.status(404).json({message: "Centro de formación no encontrado."});
        }

        res.status(200).json({ 
            ...ResponseStructure, 
            status: "success", 
            message: 'Centro de formación eliminado exitosamente' 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error interno del servidor. Inténtalo de nuevo más tarde."});
    }
};
