const pool = require('../config/database');
const Puestos ={
    findAll: function(){
        return pool.execute('SELECT * FROM puestos_vigilancia')
    }, 
    create:function(Puestosdata){
        const sql = `INSERT INTO puestos_vigilancia(
            descripcion_puesto,
            tarifa_puesto,
            ays,
            iva,
            total) VALUES (?,?,?,?)`;
            return pool.execute(sql,[
                Puestosdata.descripcion_puesto,
                Puestosdata.tarifa_puesto,
                Puestosdata.ays,
                Puestosdata.iva,
                Puestosdata.total
            ]) 
    }
};
async function findPuesto(idpuesto_vigilancia){
    const [rows,fields]=await pool.execute('SELECT * FROM puestos_vigilancia WHERE idpuesto_vigilancia = ?',[idpuesto_vigilancia])

}
async function deleteByPuesto(idpuesto_vigilancia){
try {
    const [result] = await pool.execute('DELETE FROM puestos_vigilancia WHERE idpuesto_vigilancia = ? ',[idpuesto_vigilancia])
    if(result.affectedRows === 0){
        throw new Error('Puesto no existe')
    }
    return {message : 'Puesto eliminado'}
} catch (error) {
    throw error;
}
}

module.exports = {Puestos,
    findPuesto,
    deleteByPuesto
};
