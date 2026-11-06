DROP TABLE IF EXISTS domicilio CASCADE;
DROP TABLE IF EXISTS persona   CASCADE;

-- ============================================
-- Tabla persona
-- ============================================
CREATE TABLE persona (
    id                  BIGSERIAL PRIMARY KEY,
    nombre              VARCHAR(100) NOT NULL,
    apellido_paterno    VARCHAR(100) NOT NULL,
    apellido_materno    VARCHAR(100),
    curp                VARCHAR(18)  NOT NULL UNIQUE,
    rfc                 VARCHAR(13)  NOT NULL UNIQUE,
    fecha_nacimiento    DATE,
    correo_electronico  VARCHAR(150) NOT NULL,
    telefono            VARCHAR(20)  NOT NULL
);

-- ============================================
-- Tabla domicilio
-- ============================================
CREATE TABLE domicilio (
    id               BIGSERIAL PRIMARY KEY,
    persona_id       BIGINT       NOT NULL REFERENCES persona(id) ON DELETE CASCADE,
    calle            VARCHAR(150) NOT NULL,
    numero_exterior  VARCHAR(20)  NOT NULL,
    numero_interior  VARCHAR(20),
    colonia          VARCHAR(100) NOT NULL,
    codigo_postal    VARCHAR(10)  NOT NULL,
    municipio        VARCHAR(100) NOT NULL,
    estado           VARCHAR(100) NOT NULL
);

CREATE INDEX idx_domicilio_persona_id ON domicilio(persona_id);