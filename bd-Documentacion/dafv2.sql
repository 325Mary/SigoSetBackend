SELECT 
    cc.*,
    sf.sede_formacion,
    sf.dir_sede_formacion
FROM 
    dafv2.certificacion_centrof cc
JOIN 
    dafv2.sede_formacion sf ON cc.idcentro_formacion = sf.idcentro_formacion
WHERE 
    sf.idcentro_formacion = 1;
