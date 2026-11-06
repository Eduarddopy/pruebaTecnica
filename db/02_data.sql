-- Persona de prueba
INSERT INTO persona (
    nombre, apellido_paterno, apellido_materno,
    curp, rfc, fecha_nacimiento, correo_electronico, telefono
) VALUES (
    'Eduardo Angel', 'Hernandez', 'Mora',
    'HEME011006HDFRRNA1', 'HEME011006AB1', '2001-10-06',
    'eduardoangelhdz.m@gmail.com', '7153084581'
);

-- Domicilio asociado a esa persona
INSERT INTO domicilio (
    persona_id, calle, numero_exterior, numero_interior,
    colonia, codigo_postal, municipio, estado
) VALUES (
    (SELECT id FROM persona WHERE curp = 'HEME011006HDFRRNA1'),
    'Benito Juarez', '21', NULL,
    'Benito Juarez', '61517', 'Zitacuaro', 'Michoacan'
);